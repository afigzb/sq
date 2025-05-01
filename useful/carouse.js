function carousel(slides) {
    return {
      slides,
      currentIndex: 0,
      interval: null,
      startX: 0,
      currentX: 0,

      handleClick(url) {
        console.log('Clicked URL:', url);
        // 未来可以在这里添加其他逻辑，例如打开新窗口等
      },

      startCarousel() {
        if (!this.interval) {
          this.interval = setInterval(() => {
            this.nextSlide();
          }, 3000);
        }
      },

      stopCarousel() {
        clearInterval(this.interval);
        this.interval = null;
      },

      resetCarousel() {
        this.stopCarousel();
        this.startCarousel();
      },

      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      },

      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      },

      goToSlide(index) {
        this.currentIndex = index;
      },

      touchStart(event) {
        this.stopCarousel();
        this.startX = event.touches[0].clientX;
        this.swipeDistance = 0;
      },

      touchMove(event) {
        this.currentX = event.touches[0].clientX;
        this.swipeDistance = this.currentX - this.startX;
      },

      touchEnd() {
        if (Math.abs(this.swipeDistance) > 50) {
          if (this.swipeDistance < 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        this.startCarousel();
      },

      handleVisibilityChange() {
        if (document.hidden) {
          this.stopCarousel();
        } else {
          this.startCarousel();
        }
      },

      init() {
        this.startCarousel();
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
      }
    };
  }