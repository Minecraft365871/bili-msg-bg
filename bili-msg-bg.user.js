// ==UserScript==
// @name         B站消息中心背景更改
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  为Bilibili消息中心设置背景，兼容 BewlyBewly
// @author       Minecraft_365871
// @match        https://message.bilibili.com/*
// @updateURL    https://raw.githubusercontent.com/Minecraft365871/bili-msg-bg/main/bili-msg-bg.meta.js
// @downloadURL  https://raw.githubusercontent.com/Minecraft365871/bili-msg-bg/main/bili-msg-bg.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 背景图
    const IMAGE_URL = 'https://i0.hdslb.com/bfs/seed/jinkela/short/message/img/dark_bg.png@1c.webp';

    // 注入CSS 样式
    const css = `
        /* ===== 基础背景覆盖 ===== */
        html body,
        body#app,
        body .root-wrap,
        body .bili-msg__container {
            background-image: url('${IMAGE_URL}') !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            background-position: center center !important;
            background-attachment: fixed !important;
            min-height: 100vh !important;
            /* 点击输入文本 */
            opacity: 1 !important;
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }

        /* ===== 清除 BewlyBewly干扰 ===== */
        .beauty-content-wrap,
        .main-container,
        .bili-main,
        #home_app,
        .v-wrap,
        .message-container,
        .list-container,
        .content-container,
        .bili-msg__panel,
        .bili-msg__list,
        .bili-msg__chat,
        [class*="bg-"],
        [class*="glass"],
        [class*="blur"],
        [style*="background"],
        [style*="backdrop-filter"] {
            background: transparent !important;
            background-image: none !important;
            background-color: transparent !important;
            /* 点击输入文本 */
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: none !important;
        }

        /* ===== 点击输入文本 ===== */
        body::before {
            content: "" !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: url('${IMAGE_URL}') center/cover no-repeat !important;
            z-index: -99999 !important;
            pointer-events: none !important;
            /* 确保无任何特效 */
            opacity: 1 !important;
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: none !important;
        }

        /* ===== 点击输入文本 ===== */
        *, *::before, *::after {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
    `;

    //延迟注入
    setTimeout(() => {
        try {
            const style = document.createElement('style');
            style.textContent = css;
            style.setAttribute('data-bg-override', 'minecraft365871');
            document.head.appendChild(style);
            console.log('[BG Override] 纯净背景样式已注入 ✅');
        } catch (e) {
            console.error('[BG Override] 注入失败:', e);
        }
    }, 2500);

    //监听 SPA 路由变化
    const reapply = () => {
        const existing = document.querySelector('style[data-bg-override="minecraft365871"]');
        if (existing) existing.remove();
        const style = document.createElement('style');
        style.textContent = css;
        style.setAttribute('data-bg-override', 'minecraft365871');
        document.head.appendChild(style);
    };

    const observeHistory = () => {
        const pushState = history.pushState;
        history.pushState = function(...args) {
            pushState.apply(this, args);
            setTimeout(reapply, 800);
        };
        const replaceState = history.replaceState;
        history.replaceState = function(...args) {
            replaceState.apply(this, args);
            setTimeout(reapply, 800);
        };
        window.addEventListener('popstate', () => setTimeout(reapply, 800));
    };
    observeHistory();
})();
