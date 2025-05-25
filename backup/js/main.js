// 当文档完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 添加一个简单的欢迎警告
    console.log('欢迎访问雷志坚的个人主页！');
    alert('欢迎访问雷志坚的个人主页！\n Designed by Yangchezi');
    
    // 2. 为标题添加动画效果
    const header = document.querySelector('h1');
    if (header) {
        header.addEventListener('mouseover', function() {
            this.style.color = '#3498db';
            this.style.transition = 'color 0.3s';
        });
        header.addEventListener('mouseout', function() {
            this.style.color = '';
        });
    }
    
    // 3. 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});