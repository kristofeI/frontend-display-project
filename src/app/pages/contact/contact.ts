import { ChangeDetectionStrategy, Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    console.log('Form submitted', this.form);
  }
}
