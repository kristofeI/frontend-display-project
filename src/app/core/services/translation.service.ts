import { afterNextRender, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import cs from '../i18n/cs.json';
import en from '../i18n/en.json';

type Lang = 'cs' | 'en';

const DEFAULT_LANGUAGE: Lang = 'cs';
const VALID: Lang[] = ['cs', 'en'];

function isValidLang(v: string | null): v is Lang {
  return v !== null && (VALID as string[]).includes(v);
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // restricted context (e.g. iOS private browsing)
  }
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private doc = inject(DOCUMENT);
  private router = inject(Router);
  private lang = signal<Lang>(DEFAULT_LANGUAGE);
  readonly currentLang = this.lang.asReadonly();

  constructor() {
    // Priority: ?lang= URL param (enables shareable language-specific links) → localStorage → default
    const search = this.doc.defaultView?.location.search ?? '';
    const urlParam = new URLSearchParams(search).get('lang');
    const stored = readStorage('lang');
    const initial = isValidLang(urlParam) ? urlParam : isValidLang(stored) ? stored : DEFAULT_LANGUAGE;
    this.lang.set(initial);

    if (isValidLang(urlParam)) {
      // Remove ?lang= after reading it so it doesn't linger in the address bar or history.
      afterNextRender(() => {
        this.router.navigate([], { queryParams: { lang: null }, queryParamsHandling: 'merge', replaceUrl: true });
      });
    }
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    writeStorage('lang', lang);
    this.router.navigate([], { queryParams: { lang }, queryParamsHandling: 'merge' });
  }

  translate(key: string): string {
    let dict: Record<string, unknown>;
    
    switch (this.lang()) {
      case 'en': dict = en; break;
      default:   dict = cs; break;
    }

    const result = key.split('.').reduce<unknown>(
      (node, segment) =>
        node !== null && typeof node === 'object'
          ? (node as Record<string, unknown>)[segment]
          : node,
      dict
    );

    return typeof result === 'string' ? result : key;
  }
}
