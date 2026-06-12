import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

// pure: false — language is not a pipe argument, so the pure-pipe cache would return stale translations on switch.
@Pipe({ name: 'translate', pure: false, standalone: true })
export class TranslatePipe implements PipeTransform {
  private t = inject(TranslationService);

  transform(key: string): string {
    return this.t.translate(key);
  }
}
