import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: "app-theme-selector",
  templateUrl: "./theme-selector.component.html",
  styleUrls: ["./theme-selector.component.css"]
})
export class ThemeSelectorComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  currentTheme: "light" | "dark" = "light";

  ngOnInit() {
    this.currentTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    this.setStyle(this.currentTheme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
      const newColorScheme = event.matches ? "dark" : "light";
      this.setStyle(newColorScheme);
    });
  }

  setStyle(style: "dark" | "light") {
    const html = this.document.getElementsByTagName("html")[0];
    this.currentTheme = style;
    if (style === "dark") {
      html.classList.remove("light");
      html.classList.add("dark");
    }
    else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  }

}
