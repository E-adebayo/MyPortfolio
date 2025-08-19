import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-scroll-to-top',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './scroll-to-top.component.html',
    styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
    isVisible = false;
    faArrowUp = faArrowUp;
    private scrollThreshold = 200; // Show button after scrolling 200px
    private hideTimeout: any;
    private isScrolling = false;

    ngOnInit(): void {
        // Check scroll position on init in case page is already scrolled
        this.checkScroll();
    }

    ngOnDestroy(): void {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }

    @HostListener('window:scroll', [])
    checkScroll() {
        // Clear any existing timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        const windowHeight = window.innerHeight;

        // Show button when:
        // 1. User has scrolled past the threshold
        // 2. There is enough content to scroll (document height > window height + threshold)
        const shouldShow = scrollPosition > this.scrollThreshold && 
                          documentHeight > (windowHeight + this.scrollThreshold);

        if (shouldShow && !this.isVisible) {
            this.isVisible = true;
            this.isScrolling = true;
        } else if (!shouldShow && this.isVisible) {
            // Add a small delay before hiding to prevent flickering
            this.hideTimeout = setTimeout(() => {
                this.isVisible = false;
                this.isScrolling = false;
            }, 100);
        }

        // Keep visible if user is actively scrolling and past threshold
        if (scrollPosition > this.scrollThreshold) {
            this.isScrolling = true;
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
            this.isVisible = true;
        }
    }

    scrollToTop() {
        // Add ripple effect
        const button = document.querySelector('.scroll-to-top-btn');
        if (button) {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 600);
        }

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Keep button visible during scroll animation, then hide after reaching top
        setTimeout(() => {
            if (window.pageYOffset <= this.scrollThreshold) {
                this.isVisible = false;
                this.isScrolling = false;
            }
        }, 800); // Give time for smooth scroll animation to complete
    }
}