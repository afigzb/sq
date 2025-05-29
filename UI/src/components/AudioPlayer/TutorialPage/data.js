/**
 * AudioPlayer教学数据模块
 * 支持章节和多个示例的数据结构
 */

// 教学数据
export const audioPlayerTutorialData = {
    title: "🎵 AudioPlayer 组件教程",
    description: "音频播放器 Web 组件使用指南 - 一个功能丰富的音频播放器解决方案",
    
    // 教学章节
    chapters: [
        {
            id: 'auto-play',
            title: '自动播放功能',
            subtitle: '演示如何配置AudioPlayer组件实现页面加载时自动播放音乐',
            examples: [
                {
                    id: 'auto-play-demo',
                    title: '🎶 自动播放示例',
                    description: '展示页面加载后自动播放指定歌曲的功能实现',
                    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>自动播放音乐</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(45deg, #ff6b6b, #ffa726, #ffee58, #66bb6a);
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .welcome-container {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 50px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            max-width: 500px;
            width: 90%;
        }
        
        h1 {
            color: #2d3748;
            margin-bottom: 20px;
            font-size: 2.2rem;
        }
        
        .subtitle {
            color: #4a5568;
            font-size: 1.1rem;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .music-info {
            background: rgba(255, 107, 107, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #ff6b6b;
        }
        
        .current-song {
            font-weight: 600;
            color: #e53e3e;
            font-size: 1.1rem;
            margin-bottom: 10px;
        }
        
        .song-details {
            color: #718096;
            font-size: 0.95rem;
        }
        
        .features {
            text-align: left;
            margin-top: 30px;
        }
        
        .features h3 {
            color: #2d3748;
            margin-bottom: 15px;
        }
        
        .features ul {
            color: #4a5568;
            line-height: 1.8;
            padding-left: 20px;
        }
        
        .floating-note {
            position: absolute;
            font-size: 2rem;
            animation: float 3s ease-in-out infinite;
            opacity: 0.3;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .note1 { top: 20%; left: 10%; animation-delay: 0s; }
        .note2 { top: 60%; right: 15%; animation-delay: 1s; }
        .note3 { bottom: 20%; left: 20%; animation-delay: 2s; }
    </style>
</head>
<body>
    <div class="floating-note note1">🎵</div>
    <div class="floating-note note2">🎶</div>
    <div class="floating-note note3">🎼</div>
    
    <div class="welcome-container">
        <h1>🎧 欢迎来到音乐世界</h1>
        <p class="subtitle">页面加载后自动开始播放第二首歌曲，享受美妙的音乐时光！</p>
        
        <div class="music-info">
            <div class="current-song">🎵 当前播放：yutaka hirasaka - eternal moment</div>
            <div class="song-details">自动循环播放模式 | 音质：高品质MP3</div>
        </div>
        
        <div class="features">
            <h3>✨ 特色功能</h3>
            <ul>
                <li>页面加载时自动播放指定歌曲</li>
                <li>列表循环播放模式</li>
                <li>浮动播放器控制</li>
                <li>支持进度控制和音量调节</li>
                <li>响应式设计，适配各种设备</li>
            </ul>
        </div>
    </div>
    
    <!-- 自动播放第二首歌曲的播放器 -->
    <audio-player 
        initial-track-id="track_2" 
        auto-play 
        initial-play-mode="LIST_LOOP"
        audio-base-path="../audio/">
    </audio-player>
    
    <script type="module" src="../src/AudioPlayer.js"></script>
</body>
</html>`,
                    instructions: `# 🎵 AudioPlayer 自动播放详解

## 核心功能
- **页面加载自动播放**: 使用 \`auto-play\` 属性实现
- **指定初始播放歌曲**: 通过 \`initial-track-id\` 设置
- **浮动播放器界面**: 美观的渐变背景和浮动音符动画

## 关键属性配置

### \`initial-track-id="track_2"\`
指定播放列表中第二首歌曲作为初始播放歌曲

### \`auto-play\`
启用自动播放功能，页面加载后自动开始播放

### \`initial-play-mode="LIST_LOOP"\`
设置初始播放模式为列表循环

## ⚠️ 浏览器限制
- **现代浏览器对自动播放有严格限制**
- 组件内置了重试机制来处理自动播放策略
- 在用户有交互之前，自动播放可能会被阻止

## 使用场景
- 音乐网站首页背景音乐
- 艺术展示页面氛围营造
- 游戏或应用的背景音效`
                }
            ]
        },
        
        {
            id: 'custom-playlist',
            title: '自定义播放列表',
            subtitle: '展示如何通过JavaScript API动态管理播放列表和控制播放器',
            examples: [
                {
                    id: 'playlist-management',
                    title: '📀 播放列表管理',
                    description: '演示动态切换播放列表和播放器控制的完整功能',
                    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>自定义播放列表</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            color: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 30px;
        }
        
        .playlist-section {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .playlist-section h2 {
            margin-top: 0;
            color: #fff;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            padding-bottom: 10px;
        }
        
        .playlist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .playlist-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s, background 0.3s;
        }
        
        .playlist-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .playlist-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: #fff;
        }
        
        .playlist-songs {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 0;
        }
        
        .playlist-songs li {
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.8);
        }
        
        .playlist-songs li:last-child {
            border-bottom: none;
        }
        
        .playlist-btn {
            background: #4facfe;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.3s;
            width: 100%;
        }
        
        .playlist-btn:hover {
            background: #00c6fb;
        }
        
        .player-section {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 30px;
            color: #2d3748;
            text-align: center;
        }
        
        .player-section h2 {
            color: #2d3748;
            margin-bottom: 20px;
        }
        
        .current-info {
            background: rgba(79, 172, 254, 0.1);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #4facfe;
        }
        
        .control-buttons {
            margin: 20px 0;
        }
        
        .control-buttons button {
            background: #2d3748;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            margin: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .control-buttons button:hover {
            background: #4a5568;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎵 自定义播放列表演示</h1>
            <p class="subtitle">选择不同的播放列表，体验动态切换音乐的乐趣</p>
        </header>
        
        <section class="playlist-section">
            <h2>📀 可选播放列表</h2>
            
            <div class="playlist-grid">
                <div class="playlist-card">
                    <div class="playlist-title">🎹 轻音乐精选</div>
                    <ul class="playlist-songs">
                        <li>🎵 July - Rhapsody</li>
                        <li>🎵 yutaka hirasaka - eternal moment</li>
                        <li>🎵 iwamizu - Love at First Sight</li>
                    </ul>
                    <button class="playlist-btn" onclick="loadDefaultPlaylist()">加载此播放列表</button>
                </div>
                
                <div class="playlist-card">
                    <div class="playlist-title">🌙 夜晚静谧</div>
                    <ul class="playlist-songs">
                        <li>🌙 yutaka hirasaka - eternal moment</li>
                        <li>🌙 iwamizu - Love at First Sight</li>
                    </ul>
                    <button class="playlist-btn" onclick="loadNightPlaylist()">加载此播放列表</button>
                </div>
                
                <div class="playlist-card">
                    <div class="playlist-title">☀️ 清晨活力</div>
                    <ul class="playlist-songs">
                        <li>☀️ July - Rhapsody</li>
                        <li>☀️ iwamizu - Love at First Sight</li>
                    </ul>
                    <button class="playlist-btn" onclick="loadMorningPlaylist()">加载此播放列表</button>
                </div>
            </div>
        </section>
        
        <section class="player-section">
            <h2>🎧 音乐播放器</h2>
            
            <div class="current-info" id="currentInfo">
                <strong>当前播放列表：</strong>轻音乐精选（默认）<br>
                <strong>播放模式：</strong>随机播放
            </div>
            
            <div class="control-buttons">
                <button onclick="showPlayer()">显示播放器</button>
                <button onclick="hidePlayer()">隐藏播放器</button>
                <button onclick="togglePlayMode()">切换播放模式</button>
            </div>
            
            <!-- 自定义播放列表的播放器 -->
            <audio-player 
                id="customPlayer" 
                hide-ball 
                initial-play-mode="RANDOM"
                audio-base-path="../audio/">
            </audio-player>
        </section>
    </div>
    
    <script type="module" src="../src/AudioPlayer.js"></script>
    
    <script>
        const player = document.getElementById('customPlayer');
        const currentInfo = document.getElementById('currentInfo');
        
        // 预定义的播放列表
        const playlists = {
            default: [
                { id: 'light1', title: 'July - Rhapsody', filename: 'July - Rhapsody.mp3' },
                { id: 'light2', title: 'yutaka hirasaka - eternal moment', filename: 'yutaka hirasaka - eternal moment.mp3' },
                { id: 'light3', title: 'iwamizu - Love at First Sight', filename: 'iwamizu - Love at First Sight.mp3' }
            ],
            night: [
                { id: 'night1', title: 'yutaka hirasaka - eternal moment', filename: 'yutaka hirasaka - eternal moment.mp3' },
                { id: 'night2', title: 'iwamizu - Love at First Sight', filename: 'iwamizu - Love at First Sight.mp3' }
            ],
            morning: [
                { id: 'morning1', title: 'July - Rhapsody', filename: 'July - Rhapsody.mp3' },
                { id: 'morning2', title: 'iwamizu - Love at First Sight', filename: 'iwamizu - Love at First Sight.mp3' }
            ]
        };
        
        let currentPlayMode = 'RANDOM';
        
        function loadDefaultPlaylist() {
            player.setPlaylist(playlists.default);
            updateCurrentInfo('轻音乐精选');
            showPlayer();
        }
        
        function loadNightPlaylist() {
            player.setPlaylist(playlists.night);
            updateCurrentInfo('夜晚静谧');
            showPlayer();
        }
        
        function loadMorningPlaylist() {
            player.setPlaylist(playlists.morning);
            updateCurrentInfo('清晨活力');
            showPlayer();
        }
        
        function updateCurrentInfo(playlistName) {
            currentInfo.innerHTML = \`
                <strong>当前播放列表：</strong>\${playlistName}<br>
                <strong>播放模式：</strong>\${getModeText(currentPlayMode)}
            \`;
        }
        
        function getModeText(mode) {
            const modeTexts = {
                'LIST_LOOP': '列表循环',
                'SINGLE_LOOP': '单曲循环',
                'SEQUENTIAL': '顺序播放',
                'RANDOM': '随机播放'
            };
            return modeTexts[mode] || '未知模式';
        }
        
        function showPlayer() {
            player.playerData.setExpanded(true);
        }
        
        function hidePlayer() {
            player.playerData.setExpanded(false);
        }
        
        function togglePlayMode() {
            const modes = ['LIST_LOOP', 'SINGLE_LOOP', 'SEQUENTIAL', 'RANDOM'];
            const currentIndex = modes.indexOf(currentPlayMode);
            currentPlayMode = modes[(currentIndex + 1) % modes.length];
            
            player.setPlayMode(currentPlayMode);
            updateCurrentInfo(getCurrentPlaylistName());
        }
        
        function getCurrentPlaylistName() {
            return '当前选择';
        }
        
        // 页面加载时设置默认播放列表
        window.addEventListener('load', () => {
            setTimeout(loadDefaultPlaylist, 1000);
        });
    </script>
</body>
</html>`,
                    instructions: `# 🎵 AudioPlayer 自定义播放列表详解

## 核心API功能
- **动态播放列表切换**: 支持运行时更换整个播放列表
- **多种预设播放列表**: 轻音乐、夜晚静谧、清晨活力
- **隐藏浮动球模式**: 使用 \`hide-ball\` 属性
- **播放器控制API**: 展示完整的JavaScript控制接口

## 核心API使用

### \`setPlaylist(newPlaylist)\`
动态设置新的播放列表，支持对象数组格式

### \`setPlayMode(mode)\`
切换播放模式：LIST_LOOP、SINGLE_LOOP、SEQUENTIAL、RANDOM

### \`playerData.setExpanded(true/false)\`
控制播放器面板的显示和隐藏

## 播放列表格式
支持以下两种格式：
- **简单字符串数组**: \`['song1.mp3', 'song2.mp3']\`
- **对象数组**: \`[{ id: 'song1', title: '歌曲标题', filename: 'song1.mp3' }]\`

## 使用场景
- 音乐应用的播放列表管理
- 主题音乐切换
- 动态内容音频播放

## ⚠️ 注意事项
- **路径问题**: 值得注意的是不管你在干什么请时刻留意路径问题
- **自动获取**: 代码的路径基本可以说是用js自动获取对应路径下匹配的文件
- **复杂环境**: 复杂环境下大概率会出问题，需要仔细配置路径`
                }
            ]
        },
        
        {
            id: 'advanced-features',
            title: 'AudioPlayer 组件架构',
            subtitle: '深入了解AudioPlayer的高级配置和特殊功能',
            examples: [
                {
                    id: 'architecture-overview',
                    title: '🏗️ 组件架构说明',
                    description: 'AudioPlayer采用数据驱动分层式开发，了解其设计理念',
                    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AudioPlayer 架构说明</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8fafc;
            color: #2d3748;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: #2d3748;
            margin-bottom: 30px;
        }
        
        .architecture-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
            border-bottom: 2px solid #4299e1;
            padding-bottom: 10px;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 25px 0;
        }
        
        .feature-card {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 25px;
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            border-color: #4299e1;
            box-shadow: 0 8px 25px rgba(66, 153, 225, 0.15);
            transform: translateY(-2px);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 15px;
        }
        
        .feature-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .feature-desc {
            color: #4a5568;
            text-align: center;
            font-size: 0.95rem;
        }
        
        .warning-box {
            background: #fff5f5;
            border: 1px solid #fed7d7;
            border-left: 4px solid #f56565;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .warning-title {
            color: #c53030;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .warning-text {
            color: #742a2a;
        }
        
        .tech-stack {
            background: #f0fff4;
            border: 1px solid #c6f6d5;
            border-left: 4px solid #48bb78;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .tech-title {
            color: #2f855a;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .tech-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .tech-list li {
            padding: 8px 0;
            color: #2d3748;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .tech-list li:last-child {
            border-bottom: none;
        }
        
        .tech-list li strong {
            color: #2f855a;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏗️ AudioPlayer 组件架构</h1>
        
        <div class="architecture-section">
            <div class="section-title">📋 组件概述</div>
            <p>
                AudioPlayer 是一个功能丰富的音频播放器 Web 组件，支持自动播放、
                自定义播放列表、多种播放模式、浮动播放器界面等特性。
                采用数据驱动分层式开发架构，确保代码的可维护性和扩展性。
            </p>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎵</div>
                    <div class="feature-title">音频播放</div>
                    <div class="feature-desc">支持MP3、WAV等多种音频格式，提供完整的播放控制</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <div class="feature-title">响应式UI</div>
                    <div class="feature-desc">适配各种设备尺寸，提供一致的用户体验</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🎛️</div>
                    <div class="feature-title">丰富控制</div>
                    <div class="feature-desc">播放、暂停、进度控制、音量调节、播放模式切换</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">⚙️</div>
                    <div class="feature-title">高度配置</div>
                    <div class="feature-desc">支持多种配置选项，可根据需求灵活定制</div>
                </div>
            </div>
        </div>
        
        <div class="architecture-section">
            <div class="section-title">🔧 技术架构</div>
            
            <div class="tech-stack">
                <div class="tech-title">核心技术栈</div>
                <ul class="tech-list">
                    <li><strong>Web Components:</strong> 基于原生Web Components标准</li>
                    <li><strong>Lit:</strong> 使用Lit框架进行组件开发</li>
                    <li><strong>HTML5 Audio API:</strong> 底层音频播放能力</li>
                    <li><strong>CSS3:</strong> 现代CSS特性实现UI效果</li>
                    <li><strong>ES6+:</strong> 现代JavaScript语法和特性</li>
                </ul>
            </div>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <div class="feature-title">数据驱动</div>
                    <div class="feature-desc">所有状态和配置通过数据模型管理，确保一致性</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🏗️</div>
                    <div class="feature-title">分层架构</div>
                    <div class="feature-desc">清晰的分层设计，数据层、逻辑层、表现层分离</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🔄</div>
                    <div class="feature-title">响应式更新</div>
                    <div class="feature-desc">基于Lit的响应式更新机制，高效渲染</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-title">事件驱动</div>
                    <div class="feature-desc">完善的事件系统，支持外部监听和控制</div>
                </div>
            </div>
        </div>
        
        <div class="architecture-section">
            <div class="section-title">⚠️ 已知限制</div>
            
            <div class="warning-box">
                <div class="warning-title">🚫 自动播放限制</div>
                <div class="warning-text">
                    受限于现代浏览器的安全策略，自动播放功能实际上不容易实现。
                    组件通过在lit的update生命周期中循环尝试播放，
                    直到浏览器检测到用户交互后允许播放为止。
                    这种方式可能在某些环境下仍然无法工作。
                </div>
            </div>
            
            <div class="warning-box">
                <div class="warning-title">📁 路径问题</div>
                <div class="warning-text">
                    音频文件路径配置需要特别注意。组件会自动获取指定路径下的匹配文件，
                    在复杂的部署环境下可能会出现路径解析问题。
                    建议在开发和生产环境中都进行充分测试。
                </div>
            </div>
        </div>
        
        <div class="architecture-section">
            <div class="section-title">🚀 最佳实践</div>
            <ul style="color: #4a5568; padding-left: 20px;">
                <li>在用户有明确交互意图时再启用自动播放</li>
                <li>提供音频加载状态的用户反馈</li>
                <li>确保音频文件路径的正确性</li>
                <li>为不支持的浏览器提供降级方案</li>
                <li>考虑移动设备的电量和流量消耗</li>
                <li>提供音量控制和静音选项</li>
            </ul>
        </div>
    </div>
</body>
</html>`,
                    instructions: `# 🏗️ AudioPlayer 架构深度解析

## 设计理念
- **数据驱动**: 所有组件状态通过统一的数据模型管理
- **分层架构**: 清晰分离数据层、业务逻辑层和表现层
- **组件化**: 基于Web Components标准，具有良好的封装性
- **响应式**: 利用Lit框架的响应式更新机制

## 核心技术
- **Web Components**: 原生浏览器组件化标准
- **Lit Framework**: 轻量级的组件开发框架
- **HTML5 Audio API**: 提供音频播放的底层能力
- **ES6+ JavaScript**: 现代JavaScript语法和特性

## 已知限制
- **自动播放**: 现代浏览器的安全限制使得自动播放变得困难
- **路径依赖**: 音频文件路径配置在复杂环境下可能出现问题
- **兼容性**: 部分功能依赖较新的浏览器特性

## 使用建议
- 在真实用户交互后启用音频功能
- 充分测试不同环境下的路径配置
- 为功能受限的环境提供降级方案
- 考虑移动设备的特殊性能要求`
                }
            ]
        }
    ],
    
    // 配置信息
    config: {
        theme: 'prism',
        language: 'html',
        editorConfig: {
            editable: true,
            autoPreview: true,
            showToolbar: true,
            showFullscreen: true,
            debounceDelay: 300
        }
    }
};

// 兼容性导出 - 保持向后兼容
export function getTutorialData() {
    return audioPlayerTutorialData;
}

export default audioPlayerTutorialData;
