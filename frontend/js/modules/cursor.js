export default function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    function animate() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;

        follower.style.left = fx + 'px';
        follower.style.top = fy + 'px';

        requestAnimationFrame(animate);
    }
    animate();
}