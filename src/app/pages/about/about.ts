import { Component, OnInit, ElementRef } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  // Tech terms are intentionally not translated
  readonly skills = [
    'Angular', 'TypeScript', 'RxJS', 'SCSS',
    'REST APIs', 'Git',
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    setTimeout(() => {
      this.el.nativeElement.querySelectorAll('.reveal-up').forEach((el: Element) => {
        observer.observe(el);
      });
    }, 0);
  }
}
