import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { AudioPlayerController, AudioPlayerData, PlayerUtils, AUDIO_CONFIG, IconService } from './AudioPlayerController.js';
import audioPlayerStyles from './AudioPlayer.css' assert { type: 'css' };

export class AudioPlayer extends LitElement {
    static styles = audioPlayerStyles;
    
    static properties = {
        // 浮动球显示配置
        hideBall: { type: Boolean, attribute: 'hide-ball' },
        
        // 播放模式配置
        initialPlayMode: { type: String, attribute: 'initial-play-mode' },
        
        // 播放列表配置
        playlist: { type: Array },
        
        // 初始播放歌曲ID
        initialTrackId: { type: String, attribute: 'initial-track-id' },
        
        // 初始播放状态
        autoPlay: { type: Boolean, attribute: 'auto-play' },
        
        // 音频文件基础路径
        audioBasePath: { type: String, attribute: 'audio-base-path' },
        
        // 初始音量（0-100）
        initialVolume: { type: Number, attribute: 'initial-volume' }
    };
    
    constructor() {
        super();
        this.playerData = new AudioPlayerData();
        this.playerData.subscribe(this);
        
        // 设置默认值
        this.hideBall = false;
        this.initialPlayMode = AUDIO_CONFIG.MODES.LIST_LOOP;
        this.playlist = [];
        this.initialTrackId = null;
        this.autoPlay = false;
        this.audioBasePath = 'audio/';
        this.initialVolume = 50;
        
        // 自动播放重试机制
        this.autoPlayRetryTimer = null;
        this.autoPlayRetryCount = 0;
        this.autoPlaySuccess = false;
    }
    
    firstUpdated() {
        // 使用 setTimeout 确保 DOM 完全渲染
        setTimeout(() => {
            const audioElement = this.shadowRoot.querySelector('audio');
            if (audioElement) {
                // 准备配置对象
                const config = {
                    initialPlayMode: this.initialPlayMode,
                    playlist: this.playlist,
                    initialTrackId: this.initialTrackId,
                    autoPlay: this.autoPlay,
                    audioBasePath: this.audioBasePath,
                    initialVolume: this.initialVolume
                };
                
                this.controller = new AudioPlayerController(this.playerData, audioElement, config);
            }
        }, 0);
        
        // 添加全局点击事件监听
        this.addClickOutsideHandlers();
    }
    
    updated(changedProperties) {
        super.updated(changedProperties);
        
        // 自动播放重试机制
        if (this.autoPlay && this.controller && !this.autoPlaySuccess) {
            console.log('自动播放重试机制')
            this.handleAutoPlayRetry();
        }
    }
    
    // 自动播放重试逻辑
    handleAutoPlayRetry() {
        if (this.playerData.state === AUDIO_CONFIG.STATES.PLAYING) {
            this.autoPlaySuccess = true;
            this.clearAutoPlayRetry();
            return;
        }
        
        if (this.autoPlayRetryCount < 5000) {
            if (this.autoPlayRetryTimer) {
                clearTimeout(this.autoPlayRetryTimer);
            }
            
            this.autoPlayRetryTimer = setTimeout(() => {
                this.autoPlayRetryCount++;
                this.controller.play();
                this.requestUpdate();
            }, 100);
        }
    }
    
    // 清除自动播放重试
    clearAutoPlayRetry() {
        if (this.autoPlayRetryTimer) {
            clearTimeout(this.autoPlayRetryTimer);
            this.autoPlayRetryTimer = null;
        }
        this.autoPlayRetryCount = 0;
    }
    
    // 组件销毁时清理
    disconnectedCallback() {
        super.disconnectedCallback();
        this.clearAutoPlayRetry();
    }
    
    // 提供外部API方法
    setPlaylist(newPlaylist) {
        if (this.controller) {
            this.controller.setPlaylist(newPlaylist);
        }
    }
    
    playTrack(trackId) {
        if (this.controller) {
            this.controller.playTrack(trackId);
        }
    }
    
    play() {
        if (this.controller) {
            this.controller.play();
        }
    }
    
    pause() {
        if (this.controller) {
            this.controller.pause();
        }
    }
    
    setPlayMode(mode) {
        if (this.controller) {
            this.controller.setPlayMode(mode);
        }
    }
    
    // 观察者模式更新
    onDataUpdate(changeType, data) {
        this.requestUpdate();
    }
    
    // 事件处理
    handleBallClick() {
        this.playerData.setExpanded(!this.playerData.isExpanded);
    }
    
    handlePlayClick() {
        if (this.controller) this.controller.togglePlay();
    }
    
    handlePrevClick() {
        if (this.controller) this.controller.previous();
    }
    
    handleNextClick() {
        if (this.controller) this.controller.next();
    }
    
    handleModeClick() {
        if (this.controller) this.controller.togglePlayMode();
    }
    
    handleVolumeClick() {
        if (this.controller) this.controller.toggleMute();
    }
    
    handleVolumeChange(e) {
        if (this.controller) this.controller.setVolume(e.target.value);
    }
    
    handlePlaylistClick() {
        this.playerData.setPlaylistVisible(!this.playerData.showPlaylist);
    }
    
    handleProgressClick(e) {
        if (this.controller) {
            const container = e.currentTarget;
            const clickPosition = (e.clientX - container.getBoundingClientRect().left) / container.offsetWidth;
            this.controller.seek(clickPosition);
        }
    }
    
    handleTrackClick(trackId) {
        if (this.controller) this.controller.playTrack(trackId);
    }
    
    // 添加点击外部关闭事件监听
    addClickOutsideHandlers() {
        document.addEventListener('click', (e) => {
            const path = e.composedPath();
            
            // 1. 点击非播放列表区域时关闭播放列表
            if (this.playerData.showPlaylist) {
                const playlistBtn = this.shadowRoot.querySelector('.playlist-btn');
                const playlistPopup = this.shadowRoot.querySelector('.playlist-popup');
                
                const clickedPlaylist = path.some(el => 
                    el === playlistBtn || el === playlistPopup || 
                    (el.classList && el.classList.contains('playlist-item')));
                    
                if (!clickedPlaylist) {
                    this.playerData.setPlaylistVisible(false);
                }
            }
            
            // 2. 点击播放器面板外部区域时关闭播放器面板（仅当不隐藏浮动球时）
            if (this.playerData.isExpanded && !this.hideBall) {
                const playerPanel = this.shadowRoot.querySelector('.player-panel');
                const playerBall = this.shadowRoot.querySelector('.player-ball');
                
                if (!path.some(el => el === playerPanel || el === playerBall)) {
                    this.playerData.setExpanded(false);
                }
            }
        });
    }
    
    render() {
        const isPlaying = this.playerData.state === AUDIO_CONFIG.STATES.PLAYING;
        const playIcon = isPlaying ? IconService.pause : IconService.play;
        const displayVolume = this.playerData.isMuted ? 0 : this.playerData.volume;
        
        return html`
            <audio></audio>
            
            <div class="player-container">
                <!-- 浮动小球 -->
                ${!this.hideBall ? html`
                    <div class="player-ball ${this.playerData.isExpanded ? 'hidden' : ''}" 
                         @click="${this.handleBallClick}">
                        <div class="player-controls">
                            <div .innerHTML="${playIcon}"></div>
                        </div>
                    </div>
                ` : ''}
                
                <!-- 展开的播放器面板 -->
                <div class="player-panel ${this.playerData.isExpanded ? 'show' : ''}">
                    <!-- 头部 -->
                    <div class="player-header">
                        <div class="track-info">
                            <div class="track-title">${this.playerData.getCurrentTrackTitle()}</div>
                            <div class="play-mode">${this.playerData.getPlayModeText()}</div>
                        </div>
                        ${!this.hideBall ? html`
                            <button class="close-btn" @click="${this.handleBallClick}">✕</button>
                        ` : ''}
                    </div>
                
                    <!-- 主控制区域 -->
                    <div class="player-main">
                        <!-- 进度条 -->
                        <div class="progress-container" @click="${this.handleProgressClick}">
                            <div class="progress-bar" style="width: ${this.playerData.progress}%"></div>
                        </div>
                        
                        <!-- 时间显示 -->
                        <div class="time-display">
                            <span>${PlayerUtils.formatTime(this.playerData.currentTime)}</span>
                            <span>${PlayerUtils.formatTime(this.playerData.duration)}</span>
                        </div>
                        
                        <!-- 播放控制按钮 -->
                        <div class="controls">
                            <button class="control-btn" @click="${this.handlePrevClick}" 
                                    .innerHTML="${IconService.previous}"></button>
                            <button class="play-btn" @click="${this.handlePlayClick}">
                                <div .innerHTML="${playIcon}"></div>
                            </button>
                            <button class="control-btn" @click="${this.handleNextClick}"
                                    .innerHTML="${IconService.next}"></button>
                        </div>
                        
                        <!-- 底部控制 -->
                        <div class="bottom-controls">
                            <!-- 播放模式 -->
                            <button class="mode-btn" @click="${this.handleModeClick}"
                                    title="${this.playerData.getPlayModeText()}"
                                    .innerHTML="${IconService.modes[this.playerData.playMode]}"></button>
                            
                            <!-- 音量控制 -->
                            <div class="volume-controls">
                                <button class="volume-btn" @click="${this.handleVolumeClick}"
                                        .innerHTML="${this.playerData.getVolumeIcon()}"></button>
                                <div class="volume-slider-wrapper">
                                    <div class="volume-slider-container">
                                        <div class="volume-slider-fill" style="width: ${displayVolume}%"></div>
                                        <input type="range" min="0" max="100" step="1" 
                                               .value="${String(this.playerData.volume)}"
                                               @input="${this.handleVolumeChange}">
                                    </div>
                                </div>
                                <span class="volume-display">${displayVolume}</span>
                            </div>
                            
                            <!-- 播放列表按钮 -->
                            <div class="playlist-container">
                                <button class="playlist-btn ${this.playerData.showPlaylist ? 'active' : ''}" 
                                        @click="${this.handlePlaylistClick}"
                                        .innerHTML="${IconService.list}"></button>
                                
                                <!-- 播放列表弹出框 -->
                                <div class="playlist-popup ${this.playerData.showPlaylist ? 'show' : ''}">
                                    <div class="playlist-header">播放列表</div>
                                    <div class="playlist-content">
                                        ${this.playerData.tracks.map((track, index) => html`
                                            <div class="playlist-item ${track.id === this.playerData.currentTrackId ? 'active' : ''}"
                                                 @click="${() => this.handleTrackClick(track.id)}">
                                                <span class="playlist-number">${index + 1}</span>
                                                <span class="playlist-title">${track.title}</span>
                                                ${track.id === this.playerData.currentTrackId ? 
                                                    html`<span class="playlist-playing">♪</span>` : ''}
                                            </div>
                                        `)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('audio-player', AudioPlayer);
