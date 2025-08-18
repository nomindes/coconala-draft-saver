(function() {
    'use strict';

    const DRAFT_KEY_PREFIX = 'coconala_draft_';
    let draftIndicator = null;

    function getCurrentPageKey() {
        const url = window.location.href;
        if (url.includes('/talkrooms/')) {
            const roomId = url.split('/talkrooms/')[1].split('/')[0];
            return `talkroom_${roomId}`;
        } else if (url.includes('/direct_message/')) {
            const messageId = url.split('/direct_message/')[1].split('/')[0];
            return `message_${messageId}`;
        }
        return 'default';
    }

    function saveDraft(text) {
        const key = DRAFT_KEY_PREFIX + getCurrentPageKey();
        localStorage.setItem(key, text);
        updateDraftIndicator();
        showDraftSaveAnimation();
    }

    function loadDraft() {
        const key = DRAFT_KEY_PREFIX + getCurrentPageKey();
        return localStorage.getItem(key) || '';
    }

    function clearDraft() {
        const key = DRAFT_KEY_PREFIX + getCurrentPageKey();
        const hadDraft = !!localStorage.getItem(key);
        localStorage.removeItem(key);
        
        if (hadDraft && !isDeleting) {
            showDraftDeleteAnimation();
        } else {
            updateDraftIndicator();
        }
    }

    function showDraftRestoreIndicator() {
        if (!draftIndicator) return;
        
        const statusText = draftIndicator.querySelector('span');
        const statusDot = draftIndicator.querySelector('div');
        
        draftIndicator.style.background = 'rgba(52, 199, 89, 0.08)';
        draftIndicator.style.borderColor = 'rgba(52, 199, 89, 0.3)';
        draftIndicator.style.color = '#34C759';
        draftIndicator.style.transform = 'translateY(-1px) scale(1.02)';
        
        if (statusText) {
            statusText.textContent = '読み込み中';
        }
        
        if (statusDot) {
            statusDot.style.background = '#34C759';
            statusDot.style.boxShadow = '0 0 4px rgba(52, 199, 89, 0.4)';
            statusDot.style.transform = 'scale(1.2)';
        }
        
        setTimeout(() => {
            if (statusText) {
                statusText.textContent = '✓ 下書きを復元';
            }
            
            draftIndicator.style.transform = 'translateY(-2px) scale(1.05)';
        }, 800);
        
        setTimeout(() => {
            draftIndicator.style.transform = 'translateY(0) scale(1)';
            draftIndicator.style.background = 'rgba(142, 142, 147, 0.08)';
            draftIndicator.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            draftIndicator.style.color = '#666';
            
            if (statusText) {
                statusText.textContent = '下書き';
            }
            
            if (statusDot) {
                statusDot.style.background = '#00c851';
                statusDot.style.boxShadow = '0 0 4px rgba(0, 200, 81, 0.4)';
                statusDot.style.transform = 'scale(1)';
            }
        }, 2500);
    }
    
    function showNoDraftIndicator() {
        if (!draftIndicator) return;
        
        const statusText = draftIndicator.querySelector('span');
        const statusDot = draftIndicator.querySelector('div');
        
        draftIndicator.style.background = 'rgba(142, 142, 147, 0.08)';
        draftIndicator.style.borderColor = 'rgba(174, 174, 178, 0.2)';
        draftIndicator.style.color = '#8E8E93';
        draftIndicator.style.transform = 'translateY(-1px) scale(1.02)';
        
        if (statusText) {
            statusText.textContent = '読み込み中';
        }
        
        if (statusDot) {
            statusDot.style.background = '#8E8E93';
            statusDot.style.boxShadow = 'none';
            statusDot.style.transform = 'scale(1.2)';
        }
        
        setTimeout(() => {
            if (statusText) {
                statusText.textContent = 'ー 下書きなし';
            }
            
            draftIndicator.style.transform = 'translateY(-2px) scale(1.05)';
        }, 800);
        
        setTimeout(() => {
            draftIndicator.style.opacity = '0';
            draftIndicator.style.transform = 'translateY(2px) scale(0.9)';
        }, 2500);
    }
    
    let typingAnimationTimeout = null;

    function showTypingAnimation() {
        if (!draftIndicator) return;
        
        clearTimeout(typingAnimationTimeout);
        
        draftIndicator.style.transform = 'translateY(2px) scale(1.1)';
        draftIndicator.style.background = 'rgba(0, 200, 81, 0.15)';
        
        typingAnimationTimeout = setTimeout(() => {
            if (draftIndicator) {
                draftIndicator.style.transform = 'translateY(0) scale(1)';
                draftIndicator.style.background = 'rgba(142, 142, 147, 0.08)';
            }
            typingAnimationTimeout = null;
        }, 300);
    }

    function showDraftSaveAnimation() {
        if (!draftIndicator) return;
        
        const statusText = draftIndicator.querySelector('span');
        const statusDot = draftIndicator.querySelector('div');
        
        draftIndicator.style.background = 'rgba(0, 122, 255, 0.1)';
        draftIndicator.style.borderColor = 'rgba(0, 122, 255, 0.3)';
        draftIndicator.style.color = '#007AFF';
        draftIndicator.style.transform = 'translateY(-1px) scale(1.02)';
        
        if (statusText) {
            statusText.textContent = '✓ 下書きを保存';
        }
        
        if (statusDot) {
            statusDot.style.background = '#007AFF';
            statusDot.style.boxShadow = '0 0 4px rgba(0, 122, 255, 0.4)';
        }
        
        setTimeout(() => {
            draftIndicator.style.transform = 'translateY(0) scale(1)';
            draftIndicator.style.background = 'rgba(142, 142, 147, 0.08)';
            draftIndicator.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            draftIndicator.style.color = '#666';
            
            if (statusText) {
                statusText.textContent = '下書き';
            }
            
            if (statusDot) {
                statusDot.style.background = '#00c851';
                statusDot.style.boxShadow = '0 0 4px rgba(0, 200, 81, 0.4)';
            }
        }, 1500);
    }

    let isDeleting = false;

    function showDraftDeleteAnimation() {
        if (!draftIndicator) return;
        
        isDeleting = true;
        const statusText = draftIndicator.querySelector('span');
        const statusDot = draftIndicator.querySelector('div');
        
        draftIndicator.style.background = 'rgba(255, 59, 48, 0.1)';
        draftIndicator.style.borderColor = 'rgba(255, 59, 48, 0.3)';
        draftIndicator.style.color = '#FF3B30';
        draftIndicator.style.transform = 'translateY(-1px) scale(1.02)';
        
        if (statusText) {
            statusText.textContent = '✗ 下書きを削除';
        }
        
        if (statusDot) {
            statusDot.style.background = '#FF3B30';
            statusDot.style.boxShadow = '0 0 4px rgba(255, 59, 48, 0.4)';
        }
        
        setTimeout(() => {
            if (draftIndicator) {
                draftIndicator.style.opacity = '0';
                draftIndicator.style.transform = 'translateY(2px) scale(0.9)';
            }
            
            setTimeout(() => {
                isDeleting = false;
                if (draftIndicator) {
                    draftIndicator.style.opacity = '1';
                    draftIndicator.style.transform = 'translateY(0) scale(1)';
                    draftIndicator.style.background = 'rgba(142, 142, 147, 0.08)';
                    draftIndicator.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    draftIndicator.style.color = '#666';
                    
                    if (statusText) {
                        statusText.textContent = '下書き';
                    }
                    
                    if (statusDot) {
                        statusDot.style.background = '#8E8E93';
                        statusDot.style.boxShadow = 'none';
                    }
                }
            }, 500);
        }, 2000);
    }

    function findTextarea() {
        const selectors = [
            'textarea#DirectMessageBody',
            'textarea.input.textarea', 
            'textarea[placeholder*="メッセージ"]',
            'textarea',
            'input[type="text"]',
            '[contenteditable="true"]'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null) {
                return element;
            }
        }
        return null;
    }

    function createDraftIndicator() {
        const textarea = findTextarea();
        if (!textarea || draftIndicator) return;

        draftIndicator = document.createElement('div');
        draftIndicator.className = 'coconala-draft-indicator';
        draftIndicator.style.cssText = `
            position: absolute;
            top: -30px;
            left: 8px;
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 3px 8px;
            background: rgba(142, 142, 147, 0.08);
            backdrop-filter: blur(20px) saturate(180%);
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            color: #666;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
            opacity: 1;
            transform: translateY(0) scale(1);
            z-index: 100;
            border: 0.5px solid rgba(255, 255, 255, 0.3);
        `;

        const statusDot = document.createElement('div');
        statusDot.style.cssText = `
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #00c851;
            transition: all 0.3s ease;
            box-shadow: 0 0 4px rgba(0, 200, 81, 0.4);
        `;

        const statusText = document.createElement('span');
        statusText.textContent = '下書き';
        statusText.style.cssText = `
            font-family: -webkit-system-font, system-ui, 'Segoe UI', Roboto, sans-serif;
            letter-spacing: -0.1px;
        `;

        draftIndicator.appendChild(statusDot);
        draftIndicator.appendChild(statusText);

        const textareaWrapper = textarea.parentElement;
        
        if (textareaWrapper) {
            if (getComputedStyle(textareaWrapper).position === 'static') {
                textareaWrapper.style.position = 'relative';
            }
            textareaWrapper.appendChild(draftIndicator);
        }
    }

    function positionIndicator() {
        if (!draftIndicator) return;
    }

    function updateDraftIndicator() {
        if (!draftIndicator) return;
        
        const draft = loadDraft();
        const hasDraft = draft && draft.trim();
        
        draftIndicator.style.opacity = '1';
        draftIndicator.style.transform = 'translateY(0) scale(1)';
        
        const statusText = draftIndicator.querySelector('span');
        const statusDot = draftIndicator.querySelector('div');
        
        if (hasDraft) {
            if (statusText) statusText.textContent = '下書き';
            if (statusDot) {
                statusDot.style.background = '#00c851';
                statusDot.style.boxShadow = '0 0 4px rgba(0, 200, 81, 0.4)';
            }
        } else {
            if (statusText) statusText.textContent = '下書き';
            if (statusDot) {
                statusDot.style.background = '#8E8E93';
                statusDot.style.boxShadow = 'none';
            }
        }
    }

    let hasShownLoadAnimation = false;

    function autoLoadDraft() {
        const textarea = findTextarea();
        if (!textarea || !draftIndicator || hasShownLoadAnimation) return;

        hasShownLoadAnimation = true;
        const draft = loadDraft();
        
        if (draft && !textarea.value.trim()) {
            textarea.value = draft;
            
            if (textarea.id === 'DirectMessageBody') {
                const highlighter = document.querySelector('.hwt-highlights.hwt-content');
                if (highlighter) {
                    highlighter.textContent = draft + '\n';
                }
            }
            
            showDraftRestoreIndicator();
        } else if (!textarea.value.trim()) {
            showNoDraftIndicator();
        }
    }

    function setupAutoSave() {
        const textarea = findTextarea();
        if (!textarea) return;

        let saveTimeout;
        let lastValue = textarea.value || '';

        const handleChange = () => {
            const currentValue = textarea.value || '';
            
            if (currentValue === lastValue || isDeleting) return;
            lastValue = currentValue;
            
            showTypingAnimation();
            
            clearTimeout(saveTimeout);
            
            if (!currentValue.trim()) {
                clearDraft();
                return;
            }
            
            saveTimeout = setTimeout(() => {
                if (!isDeleting) {
                    saveDraft(currentValue);
                }
            }, 2000);
        };

        textarea.addEventListener('input', handleChange);
        textarea.addEventListener('change', handleChange);
        textarea.addEventListener('keyup', handleChange);
        textarea.addEventListener('paste', () => {
            setTimeout(handleChange, 100);
        });
    }

    function init() {
        let setupAttempts = 0;
        const maxAttempts = 20;

        const checkAndSetup = () => {
            const textarea = findTextarea();
            if (textarea && !textarea.hasAttribute('data-draft-initialized')) {
                textarea.setAttribute('data-draft-initialized', 'true');
                draftIndicator = null;
                createDraftIndicator();
                updateDraftIndicator();
                autoLoadDraft();
                setupAutoSave();
                return true;
            }
            return false;
        };

        const trySetup = () => {
            if (checkAndSetup() || setupAttempts >= maxAttempts) {
                return;
            }
            setupAttempts++;
            setTimeout(trySetup, 100);
        };

        trySetup();

        const observer = new MutationObserver(() => {
            const textarea = findTextarea();
            const indicatorExists = document.querySelector('.coconala-draft-indicator');
            
            if (textarea && !indicatorExists) {
                setupAttempts = 0;
                draftIndicator = null;
                hasShownLoadAnimation = false;
                setTimeout(trySetup, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();