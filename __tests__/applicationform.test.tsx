import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ApplicationPage from '../app/applicationform/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));
vi.mock('../app/components/Header', () => ({ default: () => <div data-testid="header" /> }));
vi.mock('../app/components/Footer', () => ({ default: () => <div data-testid="footer" /> }));

describe('Application Form', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Issue #1: Validation blocks navigation', () => {
    it('should not advance to step 2 when required fields are empty', () => {
      render(<ApplicationPage />);
      fireEvent.click(screen.getByText('Continue →'));
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
});
