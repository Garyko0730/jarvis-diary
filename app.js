// 贾维斯养成日记 - 主逻辑

document.addEventListener('DOMContentLoaded', function() {
    initStats();
    initTimeline();
    initSkills();
    initAchievements();
    initSkillPacks();
    initLastUpdate();
    initScrollReveal();
    initMobileMenu();
});

// 移动端菜单
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 初始化统计数字
function initStats() {
    animateNumber('stat-days', stats.days);
    animateNumber('stat-tasks', stats.tasks);
    animateNumber('stat-skills', stats.skills);
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, duration / steps);
}

// 初始化时间线
function initTimeline() {
    const container = document.getElementById('timeline-container');
    
    timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item reveal';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
}

// 初始化技能库
function initSkills() {
    const grid = document.getElementById('skills-grid');
    
    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card reveal';
        
        card.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-desc">${skill.desc}</div>
        `;
        
        grid.appendChild(card);
    });
}

// 初始化成就墙
function initAchievements() {
    const grid = document.getElementById('achievements-grid');
    
    achievements.forEach(achievement => {
        const card = document.createElement('div');
        card.className = 'achievement-card reveal';
        
        card.innerHTML = `
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.desc}</div>
            <div class="achievement-date">${achievement.date}</div>
        `;
        
        grid.appendChild(card);
    });
}

// 初始化技能包
function initSkillPacks() {
    const grid = document.getElementById('packs-grid');
    
    skillPacks.forEach(pack => {
        const card = document.createElement('div');
        card.className = 'pack-card reveal';
        
        const tagsHtml = pack.tags.map(tag => `<span class="pack-tag">${tag}</span>`).join('');
        
        card.innerHTML = `
            <div class="pack-header">
                <span class="pack-icon">${pack.icon}</span>
                <span class="pack-name">${pack.name}</span>
            </div>
            <div class="pack-desc">${pack.desc}</div>
            <div class="pack-footer">
                <span class="pack-count">${pack.count} 个技能</span>
                <div class="pack-tags">${tagsHtml}</div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// 初始化最后更新时间
function initLastUpdate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formatted = now.toLocaleDateString('zh-CN', options);
    document.getElementById('last-update').textContent = formatted;
}

// 滚动揭示动画
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    function observeElements() {
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    observeElements();

    // 针对动态生成的元素，每隔一段时间检查一次新元素
    setInterval(observeElements, 1000);
}

// 一键安装技能
const skillPrompts = {
    search: `📥 **搜索调研技能包安装**

请帮我安装以下 Skills：
1. tavily-search - 深度研究搜索
2. multi-search-engine - 多引擎搜索
3. context7 - 文档搜索
4. openviking - 知识库 RAG

运行命令：
\`\`\`bash
clawhub install tavily-search
clawhub install multi-search-engine
clawhub install context7
clawhub install openviking
\`\`\``,
    
    content: `📥 **内容创作技能包安装**

请帮我安装以下 Skills：
1. copywriting - 文案优化
2. humanizer - 去除AI味
3. social-content - 社媒内容
4. twitter - 推文生成
5. ai-image-generation - AI生图

运行命令：
\`\`\`bash
clawhub install copywriting
clawhub install humanizer
clawhub install social-content
clawhub install twitter
clawhub install ai-image-generation
\`\`\``,
    
    dev: `📥 **开发助手技能包安装**

请帮我安装以下 Skills：
1. debug-pro - 代码调试
2. requesting-code-review - 代码审查
3. test-runner - 测试运行
4. coding-agent - 代码生成

运行命令：
\`\`\`bash
clawhub install debug-pro
clawhub install requesting-code-review
clawhub install test-runner
clawhub install coding-agent
\`\`\``,
    
    data: `📥 **数据分析技能包安装**

请帮我安装以下 Skills：
1. stock-deep-analysis - 股票分析
2. us-stock-analysis - 美股分析
3. python-executor - Python执行

运行命令：
\`\`\`bash
clawhub install stock-deep-analysis
clawhub install us-stock-analysis
clawhub install python-executor
\`\`\``,
    
    knowledge: `📥 **知识管理技能包安装**

请帮我安装以下 Skills：
1. ontology - 知识图谱
2. notion - Notion集成
3. summarize - 摘要生成

运行命令：
\`\`\`bash
clawhub install ontology
clawhub install notion
clawhub install summarize
\`\`\``,
    
    auto: `📥 **自动化运维技能包安装**

请帮我安装以下 Skills：
1. proactive-agent - 主动Agent
2. recursive-self-improvement - 自我进化
3. healthcheck - 健康检查

运行命令：
\`\`\`bash
clawhub install proactive-agent
clawhub install recursive-self-improvement
clawhub install healthcheck
\`\`\``
};

function copySkill(type) {
    const prompt = skillPrompts[type];
    if (prompt) {
        navigator.clipboard.writeText(prompt).then(() => {
            alert('✅ 安装指令已复制到剪贴板！\n\n打开你的 OpenClaw 对话框，粘贴即可安装。');
        }).catch(err => {
            console.error('复制失败:', err);
        });
    }
}
