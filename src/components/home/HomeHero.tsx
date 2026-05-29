"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { STORAGE_KEYS } from '@/lib/gameConfig';
import { loadHighScore, loadSettings, saveSettings, subscribeToLocalStorage } from '@/lib/storage';
import type { GameSettings } from '@/types/game';
import FeatureCards from './FeatureCards';

const DEFAULT_SETTINGS: GameSettings = { mute: false };

const highScoreSnapshot = () => String(loadHighScore(STORAGE_KEYS.highScore, 0));
const settingsSnapshot = () => JSON.stringify(loadSettings<GameSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS));

export default function HomeHero() {
  const highScore = Number(useSyncExternalStore(subscribeToLocalStorage, highScoreSnapshot, () => '0'));
  const settings = JSON.parse(useSyncExternalStore(subscribeToLocalStorage, settingsSnapshot, () => JSON.stringify(DEFAULT_SETTINGS))) as GameSettings;

  const toggleSound = () => {
    saveSettings(STORAGE_KEYS.settings, { mute: !settings.mute });
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__media">
          <Image src="/assets/images/background-arcade.png" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="home-hero__content">
          <p className="home-tag">CYBER ARCADE</p>
          <Image
            src="/assets/images/logo.png"
            alt="地鼠大作戰 Deluxe"
            width={420}
            height={420}
            priority
            className="home-logo"
            style={{ width: 'min(420px, 100%)', height: 'auto' }}
          />
          <h1 className="sr-only">地鼠大作戰 Deluxe</h1>
          <p className="home-copy">
            快速點擊霓虹地鼠、避開炸彈陷阱、維持 Combo，並在限時內完成每一關的目標分數。
          </p>
          <div className="home-actions">
            <Link href="/game" className="home-button">START</Link>
            <button type="button" onClick={toggleSound} className="home-secondary">
              {settings.mute ? '開啟音效' : '關閉音效'}
            </button>
            <Link href="/how-to-play" className="home-secondary">玩法</Link>
          </div>
          <div className="home-score">
            <span>最高分</span>
            <strong>{highScore}</strong>
          </div>
        </div>
      </section>
      <FeatureCards />
    </main>
  );
}
