export async function loadComponent(id, path) {
    try {
        const res = await fetch(path);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error(`Error loading ${path}`, err);
    }
}