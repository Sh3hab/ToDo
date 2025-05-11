document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.custom-checkbox input');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const container = document.querySelector('.container');
    const progressContainer = document.querySelector('.progress-container');
    
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.custom-checkbox input:checked').length;
        const percentage = Math.round((checked / total) * 100);
        
        progressBar.style.width = percentage + '%';
        progressText.textContent = percentage + '% مكتمل';
        
        // إضافة تأثير الحركة عند كل تغيير
        progressBar.classList.add('progress-animate');
        setTimeout(() => {
            progressBar.classList.remove('progress-animate');
        }, 500);
        
        // تغيير لون الـ progress bar حسب النسبة
        if (percentage < 30) {
            progressBar.style.backgroundColor = '#D2B48C';
        } else if (percentage < 70) {
            progressBar.style.backgroundColor = '#b38b6d';
        } else if (percentage < 100) {
            progressBar.style.backgroundColor = '#8a6d56';
        } else {
            progressBar.style.backgroundColor = '#654321';
            container.classList.add('completed-all');
            
            // تأثير إضافي عند الإكتمال
            progressContainer.classList.add('progress-animate');
            
            // إزالة الطبقات بعد 4 ثواني
            setTimeout(() => {
                container.classList.remove('completed-all');
                progressContainer.classList.remove('progress-animate');
            }, 4000);
        }
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const todoItem = this.closest('.todo-item');
            const taskContent = todoItem.querySelector('.task-content');
            
            if (this.checked) {
                // تأثير التكبير والتصغير
                todoItem.classList.add('task-complete');
                
                // تأثير الكسر بعد انتهاء تأثير التكبير/التصغير
                setTimeout(() => {
                    todoItem.classList.remove('task-complete');
                    todoItem.classList.add('task-break');
                    
                    // إزالة تأثير الكسر بعد 4 ثواني
                    setTimeout(() => {
                        todoItem.classList.remove('task-break');
                    }, 4000);
                }, 500);
            } else {
                todoItem.classList.remove('completed');
            }
            updateProgress();
        });
    });
    
    // تحديث التقدم عند التحميل
    updateProgress();
});

// في نهاية ملف script.js
function checkDeviceForBlender() {
    const isMobile = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent);
    const blenderTask = document.querySelector('.blender-task');
    
    if (isMobile) {
        blenderTask.querySelector('input').disabled = true;
        blenderTask.querySelector('.device-warning').style.display = 'inline-block';
    } else {
        blenderTask.querySelector('input').disabled = false;
        blenderTask.querySelector('.device-warning').style.display = 'none';
    }
}

// استدعاء الدالة عند التحميل وعند تغيير حجم الشاشة
window.addEventListener('load', checkDeviceForBlender);
window.addEventListener('resize', checkDeviceForBlender);


