// public/site-helper.js
// Lightweight utility for on-page enhancement: info cards, keyword badges, and access hints

(function() {
  'use strict';

  // ---- Configuration data (URL and keywords as plain strings) ----
  const SITE_URL = 'https://cn-holdemgame.com';
  const GAME_KEYWORDS = ['德州扑克游戏', '德州扑克', '扑克', 'holdem', 'poker'];
  const BADGE_COLORS = ['#1e88e5', '#43a047', '#fb8c00', '#e53935', '#8e24aa'];

  // ---- Helper: create a DOM element with attributes and children ----
  function createElement(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (key === 'className') {
          el.className = value;
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(el.style, value);
        } else if (key.startsWith('data-')) {
          el.setAttribute(key, value);
        } else {
          el[key] = value;
        }
      }
    }
    if (children) {
      if (typeof children === 'string') {
        el.textContent = children;
      } else if (Array.isArray(children)) {
        children.forEach(child => {
          if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            el.appendChild(child);
          }
        });
      }
    }
    return el;
  }

  // ---- Generate a random integer between min and max (inclusive) ----
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ---- Create the info card container ----
  function buildInfoCard() {
    const card = createElement('div', {
      className: 'site-helper-card',
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        maxWidth: '320px',
        background: '#ffffff',
        border: '1px solid #d0d0d0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '16px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        zIndex: '9999',
        transition: 'opacity 0.3s ease'
      }
    });

    // Header
    const header = createElement('div', {
      style: {
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#333'
      }
    }, '🔍 站点助手');

    // Description
    const desc = createElement('p', {
      style: {
        margin: '0 0 10px 0',
        color: '#555'
      }
    }, '欢迎访问 ' + SITE_URL + ' —— 专业' + GAME_KEYWORDS[0] + '平台。');

    // Access note
    const note = createElement('div', {
      style: {
        background: '#fef9e7',
        borderLeft: '4px solid #f9a825',
        padding: '8px 10px',
        borderRadius: '4px',
        marginBottom: '12px',
        color: '#6d4c00'
      }
    }, '💡 提示：部分功能需浏览器启用 JavaScript。推荐使用最新版 Chrome / Edge。');

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(note);

    // Badges section
    const badgeTitle = createElement('div', {
      style: {
        fontWeight: '600',
        marginBottom: '6px',
        color: '#444'
      }
    }, '🏷️ 关键词标签：');

    const badgeContainer = createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: '10px'
      }
    });

    GAME_KEYWORDS.forEach((kw, idx) => {
      const badge = createElement('span', {
        style: {
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: '12px',
          background: BADGE_COLORS[idx % BADGE_COLORS.length],
          color: '#fff',
          fontSize: '12px',
          fontWeight: '500',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }
      }, kw);
      badgeContainer.appendChild(badge);
    });

    card.appendChild(badgeTitle);
    card.appendChild(badgeContainer);

    // Close button
    const closeBtn = createElement('button', {
      style: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#999',
        lineHeight: '1'
      },
      textContent: '×'
    });
    closeBtn.addEventListener('click', function() {
      card.style.opacity = '0';
      setTimeout(() => {
        if (card.parentNode) card.parentNode.removeChild(card);
      }, 300);
    });
    card.appendChild(closeBtn);

    return card;
  }

  // ---- Insert the card into the page ----
  function insertHelperUI() {
    // Avoid duplicate insertion
    if (document.querySelector('.site-helper-card')) return;

    const card = buildInfoCard();
    document.body.appendChild(card);

    // Small delay then fade in
    requestAnimationFrame(() => {
      card.style.opacity = '0';
      requestAnimationFrame(() => {
        card.style.opacity = '1';
      });
    });
  }

  // ---- Wait for DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHelperUI);
  } else {
    insertHelperUI();
  }

})();