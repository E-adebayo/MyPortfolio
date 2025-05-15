import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scroll-to-top',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-to-top.component.html',
    styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
    isVisible = false;
    

    ngOnInit(): void {
        // Check scroll position on init in case page is already scrolled
        this.checkScroll();
    }

    @HostListener('window:scroll', [])
    checkScroll() {
        // Show button when page is scrolled down (threshold set to 300px)
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isVisible = scrollPosition > 300;
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // The visibility will be handled by the checkScroll method which is triggered by the scroll event
    }
}