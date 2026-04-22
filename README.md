# AlphaPulse – AI Stock News Simplifier for Beginners

## Project Overview

**AlphaPulse** is a beginner-friendly web application designed to help new investors understand stock news and turn complex financial headlines into clear, actionable insights.

Financial news can be difficult for beginners to interpret. Many articles contain technical language, conflicting signals, or overwhelming information. AlphaPulse simplifies this process by using AI to analyze stock news headlines and explain their potential market impact in plain language.

The application summarizes news and classifies its sentiment (Bullish, Bearish, or Neutral), helping beginner investors quickly understand what the news might mean for their watchlist.

---

## Problem Statement

Beginner investors often struggle to interpret financial news and translate it into structured insights or informed actions. News headlines may contain complex financial terminology, and beginners may not know whether the news indicates positive, negative, or neutral impact on a stock.

Without a system to track watchlists, interpret news, and record decisions, investment decisions become inconsistent and difficult to review.

AlphaPulse aims to solve this problem by combining a simple user interface, AI analysis, and structured data tracking.

---

## Goals

The main goals of AlphaPulse are:

* Simplify stock news into beginner-friendly explanations
* Classify news sentiment as **Bullish**, **Bearish**, or **Neutral**
* Allow users to maintain a **personal watchlist**
* Provide a **daily brief** of key news related to tracked stocks
* Help users record investment decisions through a **Decision Log**
* Demonstrate how AI can assist financial information interpretation

This application focuses on educational insights rather than investment advice.

---

## Target Users

AlphaPulse is designed for beginner investors who:

* Want to understand stock news quickly
* Have limited financial background
* Track a small number of stocks
* Spend only a few minutes per day reviewing market updates

Example user personas include:

**Persona A – Beginner Investor**

* Just starting to invest
* Reads headlines but struggles to interpret them

**Persona B – Casual Investor**

* Owns a few stocks
* Wants to know if today's news matters for their portfolio

---

## Key Features

### 1. Watchlist Tracking

Users can track selected stocks and view:

* stock ticker
* company name
* number of related news articles
* risk index
* suggested action (Monitor / Hold / Reduce Risk)

---

### 2. Daily Brief

The Daily Brief highlights the most important news items for the user’s watchlist.
Instead of showing dozens of headlines, the app focuses on **3 key insights per day** to reduce information overload.

---

### 3. AI News Simplifier

The AI News Simplifier allows users to input:

* a stock ticker
* a news headline

The system uses a large language model to generate:

* **Summary** – simplified explanation of the news
* **Impact classification** – Bullish / Bearish / Neutral

Example output:

Summary

> Apple reported stronger-than-expected earnings driven by high iPhone demand.

Impact

> Bullish

This helps beginner investors quickly understand the significance of news events.

---

### 4. Investment Evaluator

The Investment Evaluator allows users to simulate how a small investment (e.g., $1000) could be allocated based on risk preference.

Users can choose:

* conservative
* balanced
* aggressive

The application generates a suggested portfolio allocation with explanations for each asset category.

---

### 5. Decision Log

The Decision Log allows users to record investment actions, including:

* Buy
* Sell
* Hold
* Set Alert

Each entry records:

* stock ticker
* action taken
* reasoning
* date

This feature encourages reflective investing and helps users track their decision-making process.

---

## System Architecture

The application follows a modern web architecture:

User Interface (Frontend)
↓
REST API Requests
↓
FastAPI Backend
↓
Data Storage (SQLite)
↓
AI Processing (Groq LLM)

---

## Technology Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* shadcn-ui
* Vite