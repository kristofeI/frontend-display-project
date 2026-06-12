import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  form = { name: '', email: '', message: '' };

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

  onSubmit(): void {
    // placeholder — backend integration will be added later
    console.log('Form submitted', this.form);
  }
}
