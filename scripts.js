class AIToolsDirectory {
    constructor() {
        this.tools = [];
        this.baseUrl = window.location.hostname === 'localhost' 
            ? '' 
            : 'https://你的域名'; // 稍后替换为实际域名
        this.init();
    }

    async init() {
        try {
            const response = await fetch(`${this.baseUrl}/data/tools.json`);
            const data = await response.json();
            this.tools = data.tools;
            this.renderTools();
            this.setupSearch();
        } catch (error) {
            console.error('Error loading tools:', error);
            document.getElementById('tools-container').innerHTML = 
                '<p class="error">加载失败，请稍后重试</p>';
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.tools.filter(tool => 
                tool.name.toLowerCase().includes(searchTerm) ||
                tool.description.toLowerCase().includes(searchTerm)
            );
            this.renderTools(filtered);
        });
    }

    renderTools(toolsToRender = this.tools) {
        const container = document.getElementById('tools-container');
        container.innerHTML = toolsToRender.map(tool => `
            <div class="tool-card">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <div class="tags">
                    ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${tool.url}" target="_blank" class="visit-btn">访问</a>
            </div>
        `).join('');
    }
}

new AIToolsDirectory(); 