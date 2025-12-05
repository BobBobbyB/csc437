// theme.js (module-safe version)

class ThemeManager {
    constructor() {
      this.theme = localStorage.getItem('nba-theme') || 'dark';
      this.applyTheme();
    }
  
    applyTheme() {
      if (this.theme === 'light') {
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
      }
    }
  
    toggle() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('nba-theme', this.theme);
      this.applyTheme();
    }
  }
  
  // initialize on page load
  const themeManager = new ThemeManager();

  window.toggleTheme = () => themeManager.toggle();
  