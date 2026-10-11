/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Compass, Layers, LayoutGrid, X } from 'lucide-react';
import heroImage from './assets/images/hero_creative_studio_1791740171695.jpg';
import cardBrandImage from './assets/images/card_brand_architecture_1791740185190.jpg';
import cardDigitalImage from './assets/images/card_digital_systems_1791740203512.jpg';
import cardSpatialImage from './assets/images/card_spatial_direction_1791740215130.jpg';

interface DisciplineCard {
  id: string;
  index: string;
  title: string;
  category: string;
  timeline: string;
  outcomeMetric: string;
  summary: string;
  deliverables: string[];
  clientProof: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
  image: string;
  imageAlt: string;
  fallbackIcon: React.ReactNode;
}

const DISCIPLINE_CARDS: DisciplineCard[] = [
  {
    id: 'brand-architecture',
    index: '01. Identity & Editorial Systems',
    title: 'Brand Architecture & Typography',
    category: 'Visual Identity',
    timeline: '6–8 Weeks Delivery',
    outcomeMetric: '+142% Brand Recall Across Enterprise Buyers in Q3',
    summary:
      'We construct durable visual systems, bespoke typographic hierarchies, and comprehensive print and digital guidelines for architectural and technology leaders.',
    deliverables: [
      'Custom Type Scale & Editorial Grid Specification',
      'Multi-Channel Design Language & Packaging Systems',
      'Executive Monograph & Digital Brand Book'
    ],
    clientProof: {
      quote:
        'Transitioning from fragmented regional collateral to a unified typographic system shortened our enterprise sales cycle by five weeks.',
      author: 'claire Lindqvist',
      role: 'VP of Global Brand',
      organization: 'Krono Nordics AB'
    },
    image: cardBrandImage,
    imageAlt: 'Minimalist typographic print specimens and curated paper swatches on natural stone',
    fallbackIcon: <Layers className="w-8 h-8 text-slate-500" />
  },
  {
    id: 'digital-systems',
    index: '02. Web & Product Engineering',
    title: 'Interactive Digital Platforms',
    category: 'Product Architecture',
    timeline: '8–12 Weeks Delivery',
    outcomeMetric: '99.4 Lighthouse Performance & +68% Conversion Rate',
    summary:
      'We engineer responsive web applications, component libraries, and conversion-focused marketing surfaces built for speed, accessibility, and long-term maintainability.',
    deliverables: [
      'Full-Stack React & TypeScript Web Applications',
      'Accessible Design Tokens & Component Documentation',
      'Technical SEO & Sub-Second Page Load Optimization'
    ],
    clientProof: {
      quote:
        'Rebuilding our flagship product portal reduced bounce rates by 41% and generated $2.8M in qualified pipeline within four months of launch.',
      author: 'Marcus Vance-Sterling',
      role: 'Chief Product Officer',
      organization: 'Aether Precision Instruments'
    },
    image: cardDigitalImage,
    imageAlt: 'Brushed anodized aluminum and matte glass geometry in a modern gallery space',
    fallbackIcon: <LayoutGrid className="w-8 h-8 text-slate-500" />
  },
  {
    id: 'spatial-direction',
    index: '03. Environmental & Exhibition Design',
    title: 'Spatial Direction & Environments',
    category: 'Physical Spaces',
    timeline: '10–16 Weeks Delivery',
    outcomeMetric: '48,000+ Exhibition Visitors Across 4 Flagship Pavilions',
    summary:
      'We translate digital brand restraint into physical showrooms, trade pavilions, and gallery installations using honest materials like timber, stone, and architectural concrete.',
    deliverables: [
      'Flagship Showroom & Pavilion Concept Architecture',
      'Wayfinding Signage & Material Tactility Palettes',
      'Acoustic Lighting & Visitor Flow Choreography'
    ],
    clientProof: {
      quote:
        'Our Milan pavilion drew record attendance and directly secured twelve long-term commercial distribution partnerships.',
      author: 'Elena Rostova',
      role: 'Director of Exhibitions',
      organization: 'Fondazione Forma'
    },
    image: cardSpatialImage,
    imageAlt: 'Serene minimalist exhibition pavilion interior with poured concrete and warm timber bench',
    fallbackIcon: <Compass className="w-8 h-8 text-slate-500" />
  }
];

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackIcon?: React.ReactNode;
}

function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackIcon
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallbackIcon || <LayoutGrid className="w-8 h-8 text-slate-400 mb-2" />}
        <span className="mt-2 text-xs font-medium text-slate-600">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export default function App() {
  const [selectedCard, setSelectedCard] = useState<DisciplineCard | null>(null);
  const [activeDisciplineFilter, setActiveDisciplineFilter] = useState<string>('all');

  // Lead capture form state
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [selectedService, setSelectedService] = useState('Brand Architecture & Typography');
  const [projectBrief, setProjectBrief] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromCard = (card: DisciplineCard) => {
    setSelectedService(card.title);
    setSelectedCard(null);
    handleScrollToSection('contact');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail.trim())) {
      setFormError('Please enter a valid work email address.');
      return;
    }

    if (!projectBrief.trim() || projectBrief.trim().length < 10) {
      setFormError('Please share a brief overview of your project goals (at least 10 characters).');
      return;
    }

    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setWorkEmail('');
    setProjectBrief('');
    setFormError('');
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('home');
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800"
          >
            Atelier Vance
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('home');
              }}
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Overview
            </a>
            <a
              href="#disciplines"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('disciplines');
              }}
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Disciplines
            </a>
            <a
              href="#impact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('impact');
              }}
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Impact
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('contact');
              }}
              className="hover:text-slate-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleScrollToSection('contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
            >
              Schedule Discovery Call
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Primary Heading & Value Proposition */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-6">
                  <span>Multidisciplinary Design Practice</span>
                  <span aria-hidden="true">·</span>
                  <span>Zurich & San Francisco</span>
                  <span aria-hidden="true">·</span>
                  <span>ISO 9001 Certified</span>
                </div>

                <h1
                  className="font-display font-bold tracking-tight text-slate-900 mb-6"
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                    lineHeight: 1.08,
                    textWrap: 'balance'
                  }}
                >
                  Welcome to My Website
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                  We partner with architectural firms, industrial manufacturers, and software teams
                  to build enduring brand systems, high-speed web platforms, and calm physical
                  environments.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleScrollToSection('disciplines')}
                    className="px-5 py-3 text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Explore Our Three Core Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollToSection('contact')}
                    className="px-5 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Request Capabilities Deck
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 16:9 Studio Visual Anchor */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={heroImage}
                  alt="Sunlit modern architectural design studio with oak tables and floor-to-ceiling windows"
                  fallbackTitle="Atelier Vance Studio — Architectural Workspace"
                  className="w-full h-full object-cover aspect-video lg:aspect-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end p-6">
                  <div className="text-white max-w-md">
                    <p className="text-xs text-slate-200 mb-1">
                      Atelier Vance Flagship Studio · Daylight Material Library
                    </p>
                    <p className="text-sm font-medium leading-snug">
                      Designed for collaborative prototyping across print, digital interfaces, and
                      architectural scale models.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Bar Below Hero Split */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                +142%
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Average qualified inbound lead growth within 6 months of launch
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                99.4
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Median Lighthouse performance score across production web systems
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                $18.6M
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Attributed client pipeline generated in the past 12 months
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                14 Years
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Continuous multidisciplinary practice across Europe and North America
              </p>
            </div>
          </div>
        </section>

        {/* Three Cards Section — Core Disciplines */}
        <section
          id="disciplines"
          className="border-t border-slate-200 bg-white py-16 lg:py-24"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span>Core Capabilities</span>
                  <span aria-hidden="true">·</span>
                  <span>Three Specialized Pillars</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Three Foundational Disciplines Built for Measurable Impact
                </h2>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="group"
                aria-label="Highlight discipline card"
                className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start md:self-auto"
              >
                <button
                  type="button"
                  onClick={() => setActiveDisciplineFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeDisciplineFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Three Cards
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDisciplineFilter('brand-architecture')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeDisciplineFilter === 'brand-architecture'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  01. Brand
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDisciplineFilter('digital-systems')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeDisciplineFilter === 'digital-systems'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  02. Digital
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDisciplineFilter('spatial-direction')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeDisciplineFilter === 'spatial-direction'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  03. Spatial
                </button>
              </div>
            </div>

            {/* The Three Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {DISCIPLINE_CARDS.map((card) => {
                const isHighlighted =
                  activeDisciplineFilter === 'all' || activeDisciplineFilter === card.id;

                return (
                  <article
                    key={card.id}
                    className={`flex flex-col justify-between rounded-xl border transition-opacity duration-150 overflow-hidden bg-slate-50/60 ${
                      isHighlighted
                        ? 'border-slate-200 opacity-100'
                        : 'border-slate-200/60 opacity-45'
                    }`}
                  >
                    <div>
                      {/* 4:3 Card Visual */}
                      <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-200 bg-slate-100">
                        <ResilientImage
                          src={card.image}
                          alt={card.imageAlt}
                          fallbackTitle={card.title}
                          fallbackIcon={card.fallbackIcon}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                        />
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <span>{card.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{card.timeline}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                          {card.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed mb-5">
                          {card.summary}
                        </p>

                        {/* Quantified Outcome Claim */}
                        <div className="py-3 border-y border-slate-200 mb-5">
                          <p className="text-xs text-slate-500">Verified Client Impact</p>
                          <p className="text-sm font-semibold text-slate-900 tabular-nums mt-0.5">
                            {card.outcomeMetric}
                          </p>
                        </div>

                        {/* Key Deliverables */}
                        <ul className="space-y-2 text-xs text-slate-600 mb-6">
                          {card.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="text-slate-400 select-none" aria-hidden="true">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCard(card)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-800 hover:text-blue-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Inspect Specification</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInquireFromCard(card)}
                        className="px-3.5 py-2 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Select Scope
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Adjacency Proof & Client Evidence Section */}
        <section id="impact" className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>Client Evidence</span>
                <span aria-hidden="true">·</span>
                <span>Attributable Outcomes</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Substantiated Results Across Every Engagement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DISCIPLINE_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <span>{card.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{card.clientProof.organization}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-6">
                      “{card.clientProof.quote}”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 capitalize">
                      {card.clientProof.author}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {card.clientProof.role} · {card.clientProof.organization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Lead Capture / Contact Section */}
        <section id="contact" className="border-t border-slate-200 bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span>Direct Consultation</span>
                  <span aria-hidden="true">·</span>
                  <span>Response Within 1 Business Day</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4"
                  style={{ textWrap: 'balance' }}
                >
                  Initiate a Project Conversation
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  Share your timeline and primary discipline of interest. Our managing partners
                  review every inquiry directly and prepare a tailored scope estimate ahead of our
                  discovery call.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-200 text-xs text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-900">Zurich Studio</p>
                    <p className="mt-0.5">Talstrasse 82 · 8001 Zürich · Switzerland</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">San Francisco Studio</p>
                    <p className="mt-0.5">450 Sansome Street · Suite 1100 · San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Direct Desk</p>
                    <p className="mt-0.5 tabular-nums">studio@ateliervance.com · +41 44 580 29 10</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50">
                  {formSubmitted ? (
                    <div className="py-8 text-center">
                      <CheckCircle2 className="w-10 h-10 text-blue-800 mx-auto mb-4" />
                      <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                        Discovery Call Request Received
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                        Thank you, <span className="font-semibold text-slate-900">{fullName}</span>.
                        We have logged your interest in{' '}
                        <span className="font-semibold text-slate-900">{selectedService}</span> and
                        sent a calendar invitation to{' '}
                        <span className="font-semibold text-slate-900">{workEmail}</span>.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="full-name"
                            className="block text-xs font-semibold text-slate-800 mb-2"
                          >
                            Full Name
                          </label>
                          <input
                            id="full-name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Elena Rostova"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-800"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="work-email"
                            className="block text-xs font-semibold text-slate-800 mb-2"
                          >
                            Work Email
                          </label>
                          <input
                            id="work-email"
                            type="email"
                            value={workEmail}
                            onChange={(e) => setWorkEmail(e.target.value)}
                            placeholder="elena@organization.com"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="service-select"
                          className="block text-xs font-semibold text-slate-800 mb-2"
                        >
                          Primary Discipline Card
                        </label>
                        <select
                          id="service-select"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-800"
                        >
                          {DISCIPLINE_CARDS.map((card) => (
                            <option key={card.id} value={card.title}>
                              {card.index} — {card.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="project-brief"
                          className="block text-xs font-semibold text-slate-800 mb-2"
                        >
                          Project Objectives & Target Timeline
                        </label>
                        <textarea
                          id="project-brief"
                          rows={4}
                          value={projectBrief}
                          onChange={(e) => setProjectBrief(e.target.value)}
                          placeholder="Tell us about your upcoming product launch, brand overhaul, or exhibition timeline..."
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-800"
                        />
                      </div>

                      {formError && (
                        <p role="alert" className="text-xs font-medium text-red-700">
                          {formError}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-4 pt-2">
                        <span className="text-xs text-slate-500">
                          Protected by mutual NDA upon request.
                        </span>
                        <button
                          type="submit"
                          className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Schedule Discovery Call
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display font-bold text-slate-900">Atelier Vance</span>
            <span aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()} Atelier Vance LLC. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('home');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#disciplines"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('disciplines');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Disciplines
            </a>
            <a
              href="#impact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('impact');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Impact
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('contact');
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Card Specification Modal (Triggered by User Intent on Card Click) */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-card-title"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>{selectedCard.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedCard.timeline}</span>
                </div>
                <h3
                  id="modal-card-title"
                  className="font-display text-xl font-bold text-slate-900"
                >
                  {selectedCard.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                aria-label="Close modal"
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">{selectedCard.summary}</p>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 mb-6">
              <p className="text-xs text-slate-500">Benchmark Outcome</p>
              <p className="text-sm font-semibold text-slate-900 tabular-nums mt-0.5">
                {selectedCard.outcomeMetric}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-900 mb-2.5">
                Included Deliverables & Artifacts
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {selectedCard.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-slate-400" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleInquireFromCard(selectedCard)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request Scope for This Discipline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
