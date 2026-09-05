'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import type QRCodeStyling from 'qr-code-styling';
import type { CornerDotType, CornerSquareType, DotType } from 'qr-code-styling';
import {
  Check,
  Download,
  FileCode2,
  FileImage,
  Globe2,
  Infinity as InfinityIcon,
  Link2,
  LockKeyhole,
  Moon,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Sun,
  WifiOff,
} from 'lucide-react';

const SIZE_OPTIONS = [512, 1024, 2048];

type StyleId = 'classic' | 'soft' | 'dots' | 'modern' | 'bold';

const STYLE_OPTIONS: Array<{
  id: StyleId;
  dots: DotType;
  corners: CornerSquareType;
  cornerDots: CornerDotType;
}> = [
  { id: 'classic', dots: 'square', corners: 'square', cornerDots: 'square' },
  { id: 'soft', dots: 'rounded', corners: 'extra-rounded', cornerDots: 'dot' },
  { id: 'dots', dots: 'dots', corners: 'dot', cornerDots: 'dot' },
  {
    id: 'modern',
    dots: 'classy-rounded',
    corners: 'extra-rounded',
    cornerDots: 'dot',
  },
  {
    id: 'bold',
    dots: 'extra-rounded',
    corners: 'extra-rounded',
    cornerDots: 'square',
  },
];

function normalizeFilename(value: string) {
  return (
    value
      .trim()
      .toLocaleLowerCase('tr-TR')
      .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ_-]+/gi, '-')
      .replace(/^-+|-+$/g, '') || 'qr-kodu'
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState('https://qrmenulerim.store');
  const [filename, setFilename] = useState('qrmenulerim');
  const [size, setSize] = useState(1024);
  const [foreground, setForeground] = useState('#151515');
  const [background, setBackground] = useState('#ffffff');
  const [moduleStyle, setModuleStyle] = useState<StyleId>('soft');
  const [qrReady, setQrReady] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const previewRef = useRef<HTMLElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    const preferred = localStorage.getItem('qr-language');
    const language =
      preferred === 'en' || preferred === 'tr'
        ? preferred
        : navigator.language.toLowerCase().startsWith('tr')
          ? 'tr'
          : 'en';
    void i18n.changeLanguage(language);
    document.documentElement.lang = language;

    const storedTheme = localStorage.getItem('qr-theme');
    const resolvedTheme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    queueMicrotask(() => setTheme(resolvedTheme));
  }, [i18n]);

  useEffect(() => {
    document.title = t('meta.title');
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', t('meta.description'));
  }, [i18n.language, t]);

  const changeLanguage = (language: 'tr' | 'en') => {
    void i18n.changeLanguage(language);
    localStorage.setItem('qr-language', language);
    document.documentElement.lang = language;
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('qr-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const normalizedValue = value.trim();
  const displayHost = useMemo(() => {
    if (!normalizedValue) return t('waiting');
    try {
      return new URL(normalizedValue).hostname || normalizedValue;
    } catch {
      return normalizedValue.length > 42
        ? `${normalizedValue.slice(0, 42)}…`
        : normalizedValue;
    }
  }, [normalizedValue, t]);

  useEffect(() => {
    let active = true;

    void import('qr-code-styling')
      .then(({ default: QRCodeStylingClass }) => {
        if (!active || !previewRef.current) return;
        const instance = new QRCodeStylingClass({
          width: 1024,
          height: 1024,
          data: 'https://qrmenulerim.store',
          margin: 40,
          qrOptions: { errorCorrectionLevel: 'H' },
          dotsOptions: { type: 'rounded', color: '#151515' },
          cornersSquareOptions: { type: 'extra-rounded', color: '#151515' },
          cornersDotOptions: { type: 'dot', color: '#151515' },
          backgroundOptions: { color: '#ffffff' },
        });
        qrInstanceRef.current = instance;
        previewRef.current.replaceChildren();
        instance.append(previewRef.current);
        setQrReady(true);
      })
      .catch(() => setError(i18n.t('errors.engine')));

    return () => {
      active = false;
      qrInstanceRef.current = null;
    };
  }, [i18n]);

  useEffect(() => {
    const instance = qrInstanceRef.current;
    if (!instance || !qrReady || !normalizedValue) {
      return;
    }

    const selectedStyle =
      STYLE_OPTIONS.find((option) => option.id === moduleStyle) ??
      STYLE_OPTIONS[0];
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        instance.update({
          width: size,
          height: size,
          data: normalizedValue,
          margin: Math.max(20, Math.round(size * 0.04)),
          qrOptions: { errorCorrectionLevel: 'H' },
          dotsOptions: { type: selectedStyle.dots, color: foreground },
          cornersSquareOptions: {
            type: selectedStyle.corners,
            color: foreground,
          },
          cornersDotOptions: {
            type: selectedStyle.cornerDots,
            color: foreground,
          },
          backgroundOptions: { color: background },
        });
        setError('');
      } catch {
        setError(i18n.t('errors.content'));
      }
    });

    return () => {
      active = false;
    };
  }, [
    normalizedValue,
    size,
    foreground,
    background,
    moduleStyle,
    qrReady,
    i18n,
  ]);

  useEffect(() => {
    type ToolInput = { content?: unknown; filename?: unknown };
    type ToolContext = {
      registerTool: (
        tool: {
          name: string;
          title: string;
          description: string;
          inputSchema: object;
          annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
          execute: (input: ToolInput) => Promise<object>;
        },
        options: { signal: AbortSignal },
      ) => void | Promise<void>;
    };

    const context = (document as Document & { modelContext?: ToolContext })
      .modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: 'set_qr_content',
          title: 'QR içeriğini hazırla',
          description:
            'Verilen bağlantı veya metni uygulamadaki QR önizlemesine yerleştirir.',
          inputSchema: {
            type: 'object',
            properties: {
              content: { type: 'string', minLength: 1, maxLength: 4000 },
              filename: { type: 'string', minLength: 1, maxLength: 80 },
            },
            required: ['content'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          async execute(input) {
            if (typeof input.content !== 'string' || !input.content.trim()) {
              throw new Error('content boş olmayan bir metin olmalıdır.');
            }
            const content = input.content.trim();
            if (content.length > 4000) {
              throw new Error('content en fazla 4000 karakter olabilir.');
            }
            setValue(content);
            if (typeof input.filename === 'string' && input.filename.trim()) {
              setFilename(input.filename.trim().slice(0, 80));
            }
            return { status: 'ready', contentLength: content.length };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);

    return () => lifecycle.abort();
  }, []);

  const flashDownloaded = () => {
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 900);
  };

  const downloadPng = async () => {
    if (!qrInstanceRef.current || !normalizedValue) return;
    await qrInstanceRef.current.download({
      name: `${normalizeFilename(filename)}-${size}`,
      extension: 'png',
    });
    flashDownloaded();
  };

  const downloadSvg = async () => {
    if (!qrInstanceRef.current || !normalizedValue) return;
    await qrInstanceRef.current.download({
      name: normalizeFilename(filename),
      extension: 'svg',
    });
    flashDownloaded();
  };

  const reset = () => {
    setValue('https://qrmenulerim.store');
    setFilename('qrmenulerim');
    setSize(1024);
    setForeground('#151515');
    setBackground('#ffffff');
    setModuleStyle('soft');
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#generator" aria-label={t('brandAria')}>
          <span className="brand-mark" aria-hidden="true">
            <QrCode size={25} strokeWidth={2.3} />
          </span>
          <span>{t('brand')}</span>
        </a>
        <div className="topbar-actions">
          <div className="privacy-pill">
            <span className="live-dot" />
            {t('badge')}
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <div className="language-switch" aria-label={t('language')}>
            <Globe2 size={16} aria-hidden="true" />
            <button
              type="button"
              className={i18n.language === 'tr' ? 'active' : ''}
              onClick={() => changeLanguage('tr')}
              aria-pressed={i18n.language === 'tr'}
            >
              TR
            </button>
            <span>/</span>
            <button
              type="button"
              className={i18n.language === 'en' ? 'active' : ''}
              onClick={() => changeLanguage('en')}
              aria-pressed={i18n.language === 'en'}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <section className="workspace" id="generator">
        <div className="intro">
          <span className="eyebrow">{t('instant')}</span>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>

        <div className="generator-grid">
          <section className="control-card" aria-labelledby="settings-title">
            <div className="card-heading">
              <span className="step">01</span>
              <div>
                <h2 id="settings-title">{t('contentTitle')}</h2>
                <p>{t('contentDescription')}</p>
              </div>
            </div>

            <label className="field-label" htmlFor="qr-value">
              {t('contentLabel')}
            </label>
            <div className="url-field">
              <Link2 size={20} aria-hidden="true" />
              <textarea
                id="qr-value"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={t('placeholder')}
                rows={3}
                maxLength={4000}
                spellCheck={false}
                autoCapitalize="none"
              />
            </div>
            <div className="field-foot">
              <span>{t('characters', { count: normalizedValue.length })}</span>
              <span className="secure-note">
                <LockKeyhole size={14} /> {t('directLink')}
              </span>
            </div>

            <div className="divider" />

            <div className="style-section">
              <span className="field-label">{t('appearance')}</span>
              <div className="style-picker" aria-label={t('appearance')}>
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`style-option style-${option.id}${moduleStyle === option.id ? ' active' : ''}`}
                    onClick={() => setModuleStyle(option.id)}
                    aria-pressed={moduleStyle === option.id}
                  >
                    <span className="style-sample" aria-hidden="true">
                      {Array.from({ length: 9 }, (_, index) => (
                        <i key={index} />
                      ))}
                    </span>
                    <span>{t(`styles.${option.id}`)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div className="settings-row">
              <div className="setting-group size-group">
                <span className="field-label">{t('outputSize')}</span>
                <div className="segmented" aria-label={t('outputSize')}>
                  {SIZE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={size === option ? 'active' : ''}
                      onClick={() => setSize(option)}
                      aria-pressed={size === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-group">
                <span className="field-label">{t('colors')}</span>
                <div className="color-row">
                  <label className="color-control">
                    <input
                      type="color"
                      value={foreground}
                      onChange={(event) => setForeground(event.target.value)}
                      aria-label={t('qrColor')}
                    />
                    <span>{t('qr')}</span>
                  </label>
                  <label className="color-control">
                    <input
                      type="color"
                      value={background}
                      onChange={(event) => setBackground(event.target.value)}
                      aria-label={t('backgroundColor')}
                    />
                    <span>{t('background')}</span>
                  </label>
                </div>
              </div>
            </div>

            <label className="field-label filename-label" htmlFor="filename">
              {t('filename')}
            </label>
            <input
              className="text-input"
              id="filename"
              value={filename}
              onChange={(event) => setFilename(event.target.value)}
              placeholder="qr-kodu"
            />

            <button className="reset-button" type="button" onClick={reset}>
              <RotateCcw size={16} /> {t('reset')}
            </button>
          </section>

          <section className="preview-card" aria-labelledby="preview-title">
            <div className="preview-topline">
              <div>
                <span className="step step-dark">02</span>
                <h2 id="preview-title">{t('previewTitle')}</h2>
              </div>
              <span className="ready-badge">
                <Check size={14} /> {t('ready')}
              </span>
            </div>

            <div className="qr-stage">
              <div className="corner corner-tl" />
              <div className="corner corner-tr" />
              <div className="corner corner-bl" />
              <div className="corner corner-br" />
              <figure
                className={`qr-output${normalizedValue ? '' : ' is-hidden'}`}
                ref={previewRef}
                aria-label={t('qrAria', { target: displayHost })}
              />
              {!normalizedValue ? (
                <div className="empty-qr">
                  <QrCode size={58} />
                  <span>{t('enterContent')}</span>
                </div>
              ) : null}
            </div>

            <div className="destination">
              <span>{t('target')}</span>
              <strong title={normalizedValue}>{displayHost}</strong>
            </div>
            {error ? (
              <p className="error-message" role="alert">
                {error}
              </p>
            ) : null}

            <div className="download-grid">
              <button
                className="download-primary"
                type="button"
                onClick={downloadPng}
                disabled={!normalizedValue || Boolean(error)}
              >
                {downloaded ? <Check size={19} /> : <Download size={19} />}
                {downloaded ? t('downloaded') : t('downloadPng')}
                <FileImage size={17} />
              </button>
              <button
                className="download-secondary"
                type="button"
                onClick={downloadSvg}
                disabled={!normalizedValue || Boolean(error)}
              >
                <FileCode2 size={18} /> {t('downloadSvg')}
              </button>
            </div>
          </section>
        </div>
      </section>

      <section className="assurance-strip" aria-label={t('featuresLabel')}>
        <article>
          <InfinityIcon size={25} />
          <div>
            <strong>{t('features.timeless.0')}</strong>
            <span>{t('features.timeless.1')}</span>
          </div>
        </article>
        <article>
          <WifiOff size={24} />
          <div>
            <strong>{t('features.direct.0')}</strong>
            <span>{t('features.direct.1')}</span>
          </div>
        </article>
        <article>
          <ShieldCheck size={25} />
          <div>
            <strong>{t('features.free.0')}</strong>
            <span>{t('features.free.1')}</span>
          </div>
        </article>
      </section>

      <section className="truth-card">
        <div className="truth-index">/ 01</div>
        <div>
          <span className="eyebrow">{t('how')}</span>
          <h2>{t('howTitle')}</h2>
        </div>
        <p>{t('howText')}</p>
      </section>

      <footer>
        <span>{t('brand')}</span>
        <a href="https://umitcancinar.me" target="_blank" rel="noreferrer">
          {t('developedBy')} <strong>{t('developer')}</strong>
        </a>
      </footer>
    </main>
  );
}
