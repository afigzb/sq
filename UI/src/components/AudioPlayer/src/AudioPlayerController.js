// ========== 数据层 (Data Layer) ==========

// 常量配置
export const AUDIO_CONFIG = {
    // 默认播放列表（当外部没有提供时使用）
    DEFAULT_FILES: [
        'July - Rhapsody.mp3',
        'yutaka hirasaka - eternal moment.mp3',
        'iwamizu - Love at First Sight.mp3'
    ],
    MODES: {
        LIST_LOOP: 'LIST_LOOP',
        SINGLE_LOOP: 'SINGLE_LOOP', 
        SEQUENTIAL: 'SEQUENTIAL',
        RANDOM: 'RANDOM'
    },
    STATES: {
        STOPPED: 'STOPPED',
        PLAYING: 'PLAYING',
        PAUSED: 'PAUSED',
        LOADING: 'LOADING'
    },
    MODE_TEXT: {
        LIST_LOOP: '列表循环',
        SINGLE_LOOP: '单曲循环',
        SEQUENTIAL: '顺序播放',
        RANDOM: '随机播放'
    }
};

// SVG 图标服务
export const IconService = {
    play: '<svg class="icon-svg-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 15L8 18L8 6L13 9L13 15M13 9L18 12L18 12L13 15L13 9"/></svg>',
    pause: '<svg class="icon-svg-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"/></svg>',
    previous: '<svg class="icon-svg-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14 3.002a1 1 0 0 0-1.578-.816l-7 4.963a1 1 0 0 0-.007 1.628l7 5.037A1 1 0 0 0 14 13.003zM2 2.5a.5.5 0 0 1 1 0v11a.5.5 0 0 1-1 0z"/></svg>',
    next: '<svg class="icon-svg-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 3.002a1 1 0 0 1 1.578-.816l7 4.963a1 1 0 0 1 .007 1.628l-7 5.037A1 1 0 0 1 2 13.003zM14 2.5a.5.5 0 1 0-1 0v11a.5.5 0 0 0 1 0z"/></svg>',
    list: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 9V7h14v2zm0 4v-2h14v2zm0 4v-2h14v2zM4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m0 4q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m0 4q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17"/></svg>',
    modes: {
        LIST_LOOP: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 210.511V264a112.127 112.127 0 0 1-112 112H78.627l44.686-44.687l-22.626-22.626L56 353.373l-4.415 4.414l-33.566 33.567l74.022 83.276l23.918-21.26L75.63 408H352c79.4 0 144-64.6 144-144v-85.489Z"/><path d="M48 256a112.127 112.127 0 0 1 112-112h273.373l-44.686 44.687l22.626 22.626L456 166.627l4.117-4.116l33.864-33.865l-74.022-83.276l-23.918 21.26L436.37 112H160c-79.4 0-144 64.6-144 144v85.787l32-32Z"/></svg>',
        SINGLE_LOOP: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 312v32h112v-32h-40V176h-32v24h-32v32h32v80z"/><path d="M464 210.511V264a112.127 112.127 0 0 1-112 112H78.627l44.686-44.687l-22.626-22.626L56 353.373l-4.415 4.414l-33.566 33.567l74.022 83.276l23.918-21.26L75.63 408H352c79.4 0 144-64.6 144-144v-85.489Z"/><path d="M48 256a112.127 112.127 0 0 1 112-112h273.373l-44.686 44.687l22.626 22.626L456 166.627l4.117-4.116l33.864-33.865l-74.022-83.276l-23.918 21.26L436.37 112H160c-79.4 0-144 64.6-144 144v85.787l32-32Z"/></svg>',
        SEQUENTIAL: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 4V2.068a.5.5 0 0 1 .82-.385l4.12 3.433a.5.5 0 0 1-.321.884H2V4zM2 18h20v2H2zm0-7h20v2H2z"/></svg>',
        RANDOM: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 472"><path d="M70 365q74 0 118-57q0-4-5-7l-19-38q-13 27-38.5 43.5T70 323H21q-8 0-14.5 6.5T0 344t6.5 14.5T21 365zM442 9q-16-14-30 0q-15 15 0 30l27 28h-83q-73 0-117 57q0 3 4 7l19 38q13-27 38.5-43.5T356 109h83l-27 28q-15 15 0 30q6 6 15 6q7 0 15-6l64-64q13-15 0-30zm0 256q-16-14-30 0q-15 15 0 30l27 28h-83q-30 0-56-16.5T260 263l-23-47l-24-47l-10-19q-18-38-54-60.5T70 67H21q-8 0-14.5 6.5T0 88t6.5 14.5T21 109h49q64 0 96 60l24 47l23 47l11 19q20 38 55.5 60.5T358 365h84l-28 28q-15 15 0 30q6 6 15 6q8 0 15-6l64-64q13-15 0-30z"/></svg>'
    },
    volumeIcons: {
        mute: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m19.8 22.6l-3.025-3.025q-.625.4-1.325.688t-1.45.462v-2.05q.35-.125.688-.25t.637-.3L12 14.8V20l-5-5H3V9h3.2L1.4 4.2l1.4-1.4l18.4 18.4zm-.2-5.8l-1.45-1.45q.425-.775.638-1.625t.212-1.75q0-2.35-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.138T21 11.975q0 1.325-.363 2.55T19.6 16.8m-3.35-3.35L14 11.2V7.95q1.175.55 1.838 1.65T16.5 12q0 .375-.062.738t-.188.712M12 9.2L9.4 6.6L12 4zm-2 5.95V12.8L8.2 11H5v2h2.85zm-.9-3.25"/></svg>',
        low: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 15V9h4l5-5v16l-5-5zm2-2h2.85L14 15.15v-6.3L11.85 11H9zm2.5-1"/></svg>',
        medium: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 15V9h4l5-5v16l-5-5zm11 1V7.95q1.125.525 1.813 1.625T18.5 12t-.687 2.4T16 16m-4-7.15L9.85 11H7v2h2.85L12 15.15zM9.5 12"/></svg>',
        high: '<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 20.725v-2.05q2.25-.65 3.625-2.5t1.375-4.2t-1.375-4.2T14 5.275v-2.05q3.1.7 5.05 3.138T21 11.975t-1.95 5.613T14 20.725M3 15V9h4l5-5v16l-5-5zm11 1V7.95q1.175.55 1.838 1.65T16.5 12q0 1.275-.663 2.363T14 16m-4-7.15L7.85 11H5v2h2.85L10 15.15zM7.5 12"/></svg>'
    }
};

// 播放器数据管理
export class AudioPlayerData {
    constructor() {
        this.tracks = [];
        this.currentTrackId = null;
        this.playMode = AUDIO_CONFIG.MODES.LIST_LOOP;
        this.state = AUDIO_CONFIG.STATES.STOPPED;
        this.volume = 70;
        this.isMuted = false;
        this.playHistory = [];
        this.currentTime = 0;
        this.duration = 0;
        this.progress = 0;
        this.isExpanded = false;
        this.showPlaylist = false;
        
        this.observers = [];
    }
    
    // 观察者模式，用于数据变化通知
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    notify(changeType, data) {
        this.observers.forEach(observer => observer.onDataUpdate(changeType, data));
    }
    
    // 数据更新方法
    setTracks(tracks) {
        this.tracks = tracks;
        this.notify('tracks', tracks);
    }
    
    setCurrentTrack(trackId) {
        this.currentTrackId = trackId;
        this.notify('currentTrack', trackId);
    }
    
    setState(state) {
        this.state = state;
        this.notify('state', state);
    }
    
    setPlayMode(mode) {
        this.playMode = mode;
        this.notify('playMode', mode);
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(100, volume));
        this.notify('volume', this.volume);
    }
    
    setMuted(muted) {
        this.isMuted = muted;
        this.notify('muted', muted);
    }
    
    setProgress(currentTime, duration) {
        this.currentTime = currentTime;
        this.duration = duration;
        this.progress = duration ? (currentTime / duration) * 100 : 0;
        this.notify('progress', { currentTime, duration, progress: this.progress });
    }
    
    setExpanded(expanded) {
        this.isExpanded = expanded;
        if (!expanded) this.showPlaylist = false;
        this.notify('expanded', expanded);
    }
    
    setPlaylistVisible(visible) {
        this.showPlaylist = visible;
        this.notify('playlist', visible);
    }
    
    // 获取器方法
    getCurrentTrack() {
        return this.tracks.find(track => track.id === this.currentTrackId);
    }
    
    getCurrentTrackTitle() {
        const track = this.getCurrentTrack();
        return track ? track.title : '未选择音频';
    }
    
    getPlayModeText() {
        return AUDIO_CONFIG.MODE_TEXT[this.playMode];
    }
    
    getVolumeIcon() {
        if (this.isMuted || this.volume === 0) return IconService.volumeIcons.mute;
        if (this.volume < 30) return IconService.volumeIcons.low;
        if (this.volume < 70) return IconService.volumeIcons.medium;
        return IconService.volumeIcons.high;
    }
}

// 工具函数
export class PlayerUtils {
    static generateTracksFromFiles(files, basePath = 'audio/') {
        return files.map((filename, index) => ({
            id: `track_${index + 1}`,
            title: filename.replace(/\.[^/.]+$/, ""),
            filename: filename,
            src: `${basePath}${filename}`,
            index: index
        }));
    }
    
    static generateTracksFromPlaylist(playlist, basePath = 'audio/') {
        return playlist.map((item, index) => {
            if (typeof item === 'string') {
                // 如果是字符串，当做文件名处理
                return {
                    id: `track_${index + 1}`,
                    title: item.replace(/\.[^/.]+$/, ""),
                    filename: item,
                    src: `${basePath}${item}`,
                    index: index
                };
            } else {
                // 如果是对象，直接使用提供的属性
                return {
                    id: item.id || `track_${index + 1}`,
                    title: item.title || item.filename?.replace(/\.[^/.]+$/, "") || '未知标题',
                    filename: item.filename || '',
                    src: item.src || `${basePath}${item.filename}`,
                    index: index
                };
            }
        });
    }
    
    static formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}

// 切歌逻辑控制器
export class TrackSwitchController {
    constructor(playerData) {
        this.data = playerData;
    }
    
    // 手动切换到下一首（不受播放模式影响）
    getNextTrackForManual(currentTrackId, tracks) {
        if (!currentTrackId || tracks.length === 0) return null;
        
        const currentTrack = tracks.find(track => track.id === currentTrackId);
        if (!currentTrack) return null;
        
        // 手动切换总是按列表顺序，循环到开头
        const nextIndex = (currentTrack.index + 1) % tracks.length;
        return tracks[nextIndex].id;
    }
    
    // 手动切换到上一首（不受播放模式影响）
    getPreviousTrackForManual(currentTrackId, tracks) {
        if (!currentTrackId || tracks.length === 0) return null;
        
        const currentTrack = tracks.find(track => track.id === currentTrackId);
        if (!currentTrack) return null;
        
        // 手动切换总是按列表顺序，循环到末尾
        const prevIndex = (currentTrack.index - 1 + tracks.length) % tracks.length;
        return tracks[prevIndex].id;
    }
    
    // 自动播放模式切歌（歌曲结束时调用）
    getNextTrackForAutoPlay(currentTrackId, tracks, playMode, playHistory) {
        if (!currentTrackId || tracks.length === 0) return null;
        
        const currentTrack = tracks.find(track => track.id === currentTrackId);
        if (!currentTrack) return null;
        
        switch (playMode) {
            case AUDIO_CONFIG.MODES.SINGLE_LOOP:
                // 单曲循环：重复当前歌曲
                return currentTrackId;
            
            case AUDIO_CONFIG.MODES.LIST_LOOP:
                // 列表循环：按顺序播放，到末尾回到开头
                const nextIndex = (currentTrack.index + 1) % tracks.length;
                return tracks[nextIndex].id;
            
            case AUDIO_CONFIG.MODES.SEQUENTIAL:
                // 顺序播放：按顺序播放，到末尾停止
                if (currentTrack.index < tracks.length - 1) {
                    return tracks[currentTrack.index + 1].id;
                }
                return null; // 播放结束
            
            case AUDIO_CONFIG.MODES.RANDOM:
                // 随机播放：从未播放的歌曲中随机选择
                return this.getRandomTrack(currentTrackId, tracks, playHistory);
            
            default:
                return null;
        }
    }
    
    // 随机选择歌曲
    getRandomTrack(currentTrackId, tracks, playHistory) {
        // 获取未播放的歌曲
        const unplayedTracks = tracks.filter(track => !playHistory.includes(track.id));
        
        if (unplayedTracks.length === 0) {
            // 如果所有歌曲都播放过了，重置历史记录，从除当前歌曲外的所有歌曲中选择
            const availableTracks = tracks.filter(track => track.id !== currentTrackId);
            if (availableTracks.length === 0) {
                // 只有一首歌的情况
                return currentTrackId;
            }
            return availableTracks[Math.floor(Math.random() * availableTracks.length)].id;
        }
        
        // 从未播放的歌曲中随机选择
        return unplayedTracks[Math.floor(Math.random() * unplayedTracks.length)].id;
    }
    
    // 检查是否需要重置随机播放历史记录
    shouldResetRandomHistory(currentTrackId, tracks, playHistory) {
        const unplayedTracks = tracks.filter(track => !playHistory.includes(track.id));
        return unplayedTracks.length === 0;
    }
}

// 播放器控制器
export class AudioPlayerController {
    constructor(playerData, audioElement, config = {}) {
        this.data = playerData;
        this.audioElement = audioElement;
        this.trackSwitcher = new TrackSwitchController(playerData);
        this.config = config;
        
        this.setupEventListeners();
        this.initialize();
    }
    
    initialize() {
        // 设置初始播放模式
        if (this.config.initialPlayMode) {
            this.data.setPlayMode(this.config.initialPlayMode);
        }
        
        // 处理播放列表
        let tracks = [];
        if (this.config.playlist && this.config.playlist.length > 0) {
            // 使用外部提供的播放列表
            tracks = PlayerUtils.generateTracksFromPlaylist(this.config.playlist, this.config.audioBasePath);
        } else {
            // 使用默认播放列表
            tracks = PlayerUtils.generateTracksFromFiles(AUDIO_CONFIG.DEFAULT_FILES, this.config.audioBasePath);
        }
        
        this.data.setTracks(tracks);
        this.data.setVolume(70);
        
        // 设置初始播放歌曲
        if (tracks.length > 0) {
            let initialTrackId = null;
            
            if (this.config.initialTrackId) {
                // 查找指定的初始歌曲
                const track = tracks.find(t => t.id === this.config.initialTrackId);
                if (track) {
                    initialTrackId = this.config.initialTrackId;
                }
            }
            
            // 如果没有找到指定的歌曲，使用第一首
            if (!initialTrackId) {
                initialTrackId = tracks[0].id;
            }
            
            this.loadTrack(initialTrackId);
            
            // 如果配置了自动播放，则开始播放
            if (this.config.autoPlay) {
                setTimeout(() => {
                    this.play();
                }, 100);
            }
        }
    }
    
    // 外部API：设置播放列表
    setPlaylist(newPlaylist) {
        if (!newPlaylist || newPlaylist.length === 0) return;
        
        const tracks = PlayerUtils.generateTracksFromPlaylist(newPlaylist, this.config.audioBasePath);
        this.data.setTracks(tracks);
        
        // 如果当前没有播放中的歌曲，加载第一首
        if (!this.data.currentTrackId || !tracks.find(t => t.id === this.data.currentTrackId)) {
            this.loadTrack(tracks[0].id);
        }
    }
    
    // 外部API：设置播放模式
    setPlayMode(mode) {
        if (Object.values(AUDIO_CONFIG.MODES).includes(mode)) {
            this.data.setPlayMode(mode);
            
            // 切换到随机模式时重置播放历史记录
            if (mode === AUDIO_CONFIG.MODES.RANDOM) {
                this.data.playHistory = this.data.currentTrackId ? [this.data.currentTrackId] : [];
            }
        }
    }
    
    setupEventListeners() {
        // 音频元素事件
        this.audioElement.addEventListener('loadeddata', () => this.data.notify('tracks', null));
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.handleTrackEnded());
        this.audioElement.addEventListener('play', () => this.data.setState(AUDIO_CONFIG.STATES.PLAYING));
        this.audioElement.addEventListener('pause', () => this.data.setState(AUDIO_CONFIG.STATES.PAUSED));
        this.audioElement.addEventListener('loadstart', () => this.data.setState(AUDIO_CONFIG.STATES.LOADING));
    }
    
    // 播放控制方法
    loadTrack(trackId) {
        const track = this.data.tracks.find(track => track.id === trackId);
        if (!track) return false;
        
        this.audioElement.pause();
        this.data.setCurrentTrack(trackId);
        this.audioElement.src = track.src;
        this.audioElement.load();
        return true;
    }
    
    playTrack(trackId) {
        if (this.loadTrack(trackId)) {
            setTimeout(() => {
                this.play();
            }, 100);
            if (!this.data.playHistory.includes(trackId)) {
                this.data.playHistory.push(trackId);
            }
        }
    }
    
    play() {
        if (this.data.currentTrackId) {
            this.audioElement.play()
                .then(() => this.data.setState(AUDIO_CONFIG.STATES.PLAYING))
                .catch(() => this.data.setState(AUDIO_CONFIG.STATES.PAUSED));
        }
    }
    
    pause() {
        this.audioElement.pause();
        this.data.setState(AUDIO_CONFIG.STATES.PAUSED);
    }
    
    togglePlay() {
        if (this.data.state === AUDIO_CONFIG.STATES.PLAYING) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    next() {
        const nextId = this.trackSwitcher.getNextTrackForManual(
            this.data.currentTrackId, 
            this.data.tracks
        );
        if (nextId) this.playTrack(nextId);
    }
    
    previous() {
        const prevId = this.trackSwitcher.getPreviousTrackForManual(
            this.data.currentTrackId, 
            this.data.tracks
        );
        if (prevId) this.playTrack(prevId);
    }
    
    setVolume(volume) {
        this.data.setVolume(volume);
        this.audioElement.volume = this.data.volume / 100;
    }
    
    toggleMute() {
        this.data.setMuted(!this.data.isMuted);
        this.audioElement.muted = this.data.isMuted;
    }
    
    togglePlayMode() {
        const modes = Object.values(AUDIO_CONFIG.MODES);
        const currentIndex = modes.indexOf(this.data.playMode);
        const newMode = modes[(currentIndex + 1) % modes.length];
        
        this.setPlayMode(newMode);
    }
    
    toggleExpanded() {
        this.data.setExpanded(!this.data.isExpanded);
    }
    
    togglePlaylist() {
        this.data.setPlaylistVisible(!this.data.showPlaylist);
    }
    
    seek(clickPosition) {
        if (this.audioElement.duration) {
            this.audioElement.currentTime = clickPosition * this.audioElement.duration;
        }
    }
    
    updateProgress() {
        if (this.audioElement.duration) {
            this.data.setProgress(this.audioElement.currentTime, this.audioElement.duration);
        }
    }
    
    handleTrackEnded() {
        // 在随机模式下，如果需要重置历史记录，先重置
        if (this.data.playMode === AUDIO_CONFIG.MODES.RANDOM) {
            if (this.trackSwitcher.shouldResetRandomHistory(
                this.data.currentTrackId, 
                this.data.tracks, 
                this.data.playHistory
            )) {
                this.data.playHistory = [this.data.currentTrackId];
            }
        }
        
        const nextId = this.trackSwitcher.getNextTrackForAutoPlay(
            this.data.currentTrackId, 
            this.data.tracks, 
            this.data.playMode, 
            this.data.playHistory
        );
        
        if (nextId) {
            this.playTrack(nextId);
        } else {
            this.data.setState(AUDIO_CONFIG.STATES.STOPPED);
        }
    }
}
