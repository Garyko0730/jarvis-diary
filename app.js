// 贾维斯养成日记 - 主逻辑

document.addEventListener('DOMContentLoaded', function() {
    initStats();
    initTimeline();
    initSkills();
    initAchievements();
    initSkillPacks();
    initLastUpdate();
    initScrollReveal();
});

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
