function parseFrontmatter(md) {
    const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return { meta: {}, content: md }

    const meta = {}
    match[1].split('\n').forEach(line => {
        const [key, ...val] = line.split(':')
        if (key) meta[key.trim()] = val.join(':').trim()
    })
    return { meta, content: match[2] }
}

function generateTOC(contentEl) {
    const headings = contentEl.querySelectorAll('h2')
    if (headings.length === 0) return ''

    let toc = '<ul>'
    headings.forEach((h) => {
        const id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
        h.id = id  // This sets ID on actual DOM element
        toc += `<li><a href="#${id}">${h.textContent}</a></li>`
    })
    toc += '</ul>'
    return toc
}

const articleLoad = async () => {
    const slug = new URLSearchParams(window.location.search).get('slug')
    if (!slug) {
        document.querySelector('.article-content').innerHTML = '<p>No article specified.</p>'
        return
    }

    try {
        const res = await fetch(`articles/${slug}.md`)
        if (!res.ok) throw new Error('Article not found')
        const md = await res.text()

        const { meta, content } = parseFrontmatter(md)
        const html = marked.parse(content)

        // Inject content FIRST
        const contentEl = document.querySelector('.article-content')
        contentEl.innerHTML = html

        // Generate TOC from actual DOM (so IDs persist)
        const toc = generateTOC(contentEl)

        // Inject metadata
        if (meta.title) {
            document.querySelector('.article-title').textContent = meta.title
            document.title = `George Salapa — ${meta.title}`
        }
        if (meta.subtitle) {
            document.querySelector('.article-subtitle').textContent = meta.subtitle
        }
        if (meta.date) {
            document.querySelector('.article-date').textContent = meta.date
        }
        document.querySelector('.toc').innerHTML = '<strong>Contents</strong>' + toc

    } catch (err) {
        document.querySelector('.article-content').innerHTML = `<p>Error: ${err.message}</p>`
    }
}

const themeToggle = () => {
    const toggle = document.querySelector('.theme-toggle')
    if (!toggle) return

    // Check saved preference on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark')
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark')
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light')
    })
}

document.addEventListener('DOMContentLoaded', () => {
    themeToggle()

    // Only run articleLoad if we're on article page
    if (document.querySelector('.article-content')) {
        articleLoad()
    }
})