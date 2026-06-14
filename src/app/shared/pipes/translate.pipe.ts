import { ChangeDetectorRef, effect, inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

// pure: false — language is not a pipe argument, so the pure-pipe cache would return stale translations on switch.
// effect() tracks the currentLang signal and calls markForCheck() so the host component re-renders on language change
// even in zoneless mode where CD no longer runs automatically on every event.
@Pipe({ name: 'translate', pure: false, standalone: true })
export class TranslatePipe implements PipeTransform {
  private t = inject(TranslationService);
  private cdRef = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.t.currentLang(); // register signal dependency
      this.cdRef.markForCheck(); // re-render host when language changes
    });
  }

  transform(key: string): string {
    return this.t.translate(key);
  }
}
