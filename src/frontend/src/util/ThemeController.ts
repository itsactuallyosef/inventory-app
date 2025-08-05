class ThemeController {
  private theme: "light" | "dark";

  constructor() {
    this.theme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    this.applyTheme();
  }

  public toggleTheme(): void {
    this.theme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", this.theme);
    this.applyTheme();
  }

  public getTheme(): "light" | "dark" {
    return this.theme;
  }

  private applyTheme(): void {
    document.documentElement.setAttribute("data-theme", this.theme);
  }
}

export default new ThemeController();
