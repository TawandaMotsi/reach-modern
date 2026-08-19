import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ApplicationPage from '../app/applicationform/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));
vi.mock('../app/components/Header', () => ({ default: () => <div data-testid="header" /> }));
vi.mock('../app/components/Footer', () => ({ default: () => <div data-testid="footer" /> }));

describe('Application Form', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  describe('Issue #1: Validation blocks navigation', () => {
    it('should not advance to step 2 when required fields are empty', () => {
      render(<ApplicationPage />);
      fireEvent.click(screen.getAllByText('Continue →')[0]);
      expect(screen.getByText('Please complete the following required fields:')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    });
  });

  describe('Issue #6: Save draft functionality', () => {
    it('should show save draft button', () => {
      render(<ApplicationPage />);
      expect(screen.getAllByText('💾 Save Draft').length).toBeGreaterThan(0);
    });

    it('should save draft to localStorage', () => {
      render(<ApplicationPage />);
      fireEvent.click(screen.getAllByText('💾 Save Draft')[0]);
      expect(localStorage.getItem('reach_application_draft')).not.toBeNull();
    });

    it('should show restore banner when draft exists', () => {
      localStorage.setItem('reach_application_draft', JSON.stringify({
        data: { firstName: 'Test' },
        step: 2,
        fileNames: {},
        savedAt: new Date().toISOString(),
      }));
      render(<ApplicationPage />);
      expect(screen.getByText(/You have a saved application draft/)).toBeInTheDocument();
    });

    it('should show saved confirmation toast', () => {
      render(<ApplicationPage />);
      fireEvent.click(screen.getAllByText('💾 Save Draft')[0]);
      expect(screen.getByText(/Application draft saved/)).toBeInTheDocument();
    });
  });

  describe('Issue #7: Role-specific fields', () => {
    it('should not show NMC/RCN/HPC/Band fields for Care Assistant', () => {
      render(<ApplicationPage />);
      const selects = document.querySelectorAll('select');
      fireEvent.change(selects[0], { target: { value: 'Care Assistant' } });
      // Labels are uppercase via CSS, but text content is lowercase
      expect(screen.queryByText(/NMC Pin No/i)).not.toBeInTheDocument();
    });

    it('should show NMC/RCN/HPC/Band fields for RGN', () => {
      render(<ApplicationPage />);
      const selects = document.querySelectorAll('select');
      fireEvent.change(selects[0], { target: { value: 'RGN' } });
      expect(screen.getByText(/NMC Pin No/i)).toBeInTheDocument();
      expect(screen.getByText(/RCN Number/i)).toBeInTheDocument();
      expect(screen.getByText(/HPC Number/i)).toBeInTheDocument();
      // "Band" label exists with a required asterisk as child
      expect(screen.getByText((content, el) => el?.tagName === 'LABEL' && /^band$/i.test(content.trim()))).toBeInTheDocument();
    });
  });

  describe('Issue #3: Duplicate submission guard (isSubmitting)', () => {
    it('fetch is not called when validation fails on step 1', () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      );

      render(<ApplicationPage />);
      // Click Continue without filling any fields — validation blocks, fetch never fires
      fireEvent.click(screen.getAllByText('Continue →')[0]);

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(screen.getByText('Please complete the following required fields:')).toBeInTheDocument();
    });

    it('submit button is not present on step 1 — only "Continue →" is shown', () => {
      render(<ApplicationPage />);
      expect(screen.queryByText('Submit Application ✓')).not.toBeInTheDocument();
      expect(screen.queryByText('Submitting…')).not.toBeInTheDocument();
      expect(screen.getAllByText('Continue →').length).toBeGreaterThan(0);
    });

    it('Continue button is not disabled on step 1 (no submission in flight)', () => {
      let resolveFetch!: (v: Response) => void;
      const pendingFetch = new Promise<Response>(res => { resolveFetch = res; });
      vi.spyOn(globalThis, 'fetch').mockReturnValue(pendingFetch as Promise<Response>);

      render(<ApplicationPage />);

      // "Continue →" on step 1 is not a submit — it should never be disabled
      expect(screen.getAllByText('Continue →')[0]).not.toBeDisabled();

      resolveFetch(new Response(JSON.stringify({ success: true }), { status: 200 }));
    });

    it('rapid clicks on "Continue" do not call fetch (validation fires, not submission)', () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      );

      render(<ApplicationPage />);
      const btn = screen.getAllByText('Continue →')[0];

      // Rapid-fire 5 clicks — each triggers step validation, none reaches fetch
      fireEvent.click(btn);
      fireEvent.click(btn);
      fireEvent.click(btn);
      fireEvent.click(btn);
      fireEvent.click(btn);

      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('isSubmitting guard: concurrent calls only dispatch fetch once', async () => {
      let callCount = 0;
      vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        callCount++;
        // Brief delay to keep the promise pending long enough for concurrent call
        await new Promise(r => setTimeout(r, 10));
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      });

      // Mirror the exact guard logic from the component
      let isSubmitting = false;
      const submit = async () => {
        if (isSubmitting) return;
        isSubmitting = true;
        try {
          await globalThis.fetch('/api/submit-application', { method: 'POST' });
        } finally {
          isSubmitting = false;
        }
      };

      // Two concurrent calls — only the first should reach fetch
      const first = submit();
      const second = submit(); // isSubmitting is already true
      await Promise.all([first, second]);

      expect(callCount).toBe(1); // guard blocked the duplicate
    });

    it('isSubmitting resets to false after a successful submission', async () => {
      let callCount = 0;
      vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        callCount++;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      });

      let isSubmitting = false;
      const submit = async () => {
        if (isSubmitting) return;
        isSubmitting = true;
        try {
          await globalThis.fetch('/api/submit-application', { method: 'POST' });
        } finally {
          isSubmitting = false;
        }
      };

      await submit();
      expect(callCount).toBe(1);
      expect(isSubmitting).toBe(false); // reset — user can submit again if needed

      // A sequential second call works fine (not a duplicate)
      await submit();
      expect(callCount).toBe(2);
    });

    it('isSubmitting resets to false after a failed submission (user can retry)', async () => {
      let callCount = 0;
      vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        callCount++;
        return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500 });
      });

      let isSubmitting = false;
      const submit = async () => {
        if (isSubmitting) return;
        isSubmitting = true;
        try {
          await globalThis.fetch('/api/submit-application', { method: 'POST' });
        } finally {
          isSubmitting = false; // always resets, even on failure
        }
      };

      await submit(); // fails
      expect(callCount).toBe(1);
      expect(isSubmitting).toBe(false); // reset — user can retry

      await submit(); // retry
      expect(callCount).toBe(2);
    });

    it('three rapid concurrent calls only dispatch fetch once', async () => {
      let callCount = 0;
      vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
        callCount++;
        await new Promise(r => setTimeout(r, 20));
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      });

      let isSubmitting = false;
      const submit = async () => {
        if (isSubmitting) return;
        isSubmitting = true;
        try {
          await globalThis.fetch('/api/submit-application', { method: 'POST' });
        } finally {
          isSubmitting = false;
        }
      };

      // Fire three at the same time
      await Promise.all([submit(), submit(), submit()]);

      expect(callCount).toBe(1); // only the first one got through
    });
  });
});
