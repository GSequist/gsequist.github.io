function processFootnotes(html) {
    const defs = {}
    html = html.replace(/<p>\[\^(\w+)\]:\s*([\s\S]*?)<\/p>/g, (_, id, text) => {
        defs[id] = text
        return ''
    })
    html = html.replace(/\[\^(\w+)\]/g, (_, id) =>
        `<sup><a href="#fn-${id}" id="fnref-${id}">${id}</a></sup>`
    )
    if (Object.keys(defs).length > 0) {
        let section = '<section class="footnotes"><hr><ol>'
        for (const [id, text] of Object.entries(defs)) {
            section += `<li id="fn-${id}">${text} <a href="#fnref-${id}">↩</a></li>`
        }
        section += '</ol></section>'
        html += section
    }
    return html
}

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
        const html = processFootnotes(marked.parse(content))

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

// === AI VIEW: assemble whole site into one markdown stream ===
const txt = (el) => el ? el.textContent.trim().replace(/\s+/g, ' ') : ''

const buildProfileMarkdown = (doc) => {
    let md = `# ${txt(doc.querySelector('.hero h1'))}\n\n`
    md += `> ${txt(doc.querySelector('.tagline'))}\n\n`
    const sub = doc.querySelector('.subtitle')
    md += `${sub ? sub.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : ''}\n\n`

    md += `## What I Build\n\n`
    doc.querySelectorAll('.capability').forEach(c => {
        md += `### ${txt(c.querySelector('h3'))}\n${txt(c.querySelector('p'))}\n\n`
    })

    md += `## Selected Work\n\n`
    doc.querySelectorAll('.case').forEach(c => {
        md += `### ${txt(c.querySelector('h3'))} — ${txt(c.querySelector('.case-industry'))}\n`
        md += `${txt(c.querySelector('p'))}\n`
        md += `*${txt(c.querySelector('.case-metric'))}*\n\n`
    })

    md += `## Contact\n\ngeorge@salapa.xyz\n\n`
    return md
}

const generateAIView = async () => {
    const pre = document.querySelector('#ai-md')
    try {
        // index.html is the single source of truth — profile + article list
        const res = await fetch('index.html')
        if (!res.ok) throw new Error('could not load site')
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html')

        let md = buildProfileMarkdown(doc)
        md += `---\n\n# Articles\n`

        const links = [...doc.querySelectorAll('.articles a')]
        for (const a of links) {
            const href = a.getAttribute('href') || ''
            const slug = new URLSearchParams(href.split('?')[1] || '').get('slug')
            if (!slug) continue
            const amd = await fetch(`articles/${slug}.md`)
            if (!amd.ok) continue
            const { content } = parseFrontmatter(await amd.text())
            md += `\n\n## ${txt(a)}\n\n${content.trim()}\n\n---\n`
        }

        pre.textContent = md
    } catch (err) {
        pre.textContent = `error: ${err.message}`
    }
}

const themeToggle = () => {
    // Apply saved preference on every page, toggle button or not
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark')
    }

    const toggle = document.querySelector('.theme-toggle')
    if (!toggle) return

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

    // Run AI view assembly if we're on ai.html
    if (document.querySelector('#ai-md')) {
        generateAIView()
    }
})