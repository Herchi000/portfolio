import { AfterViewInit, Component, ElementRef, input, OnDestroy, OnInit, QueryList, Renderer2, Signal, viewChild, viewChildren } from "@angular/core";
import { Project } from "../../interfaces/project.interface";
import { interval, Observable, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-project",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./project.component.html",
  styleUrl: "./project.component.css",
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
  project = input.required<Project>();
  imageSliderRef: Signal<ElementRef | undefined> = viewChild("imageSliderRef");
  imagesRef: Signal<readonly ElementRef[]> = viewChildren("imageRef");
  imageSliderIndex:number = 0;
  private intervalo: Observable<number>;
  private imgSliderAnimation = new Subscription();

  constructor(private renderer2: Renderer2) {
    this.intervalo = interval(4000);
  }

  ngOnInit(): void {
    this.imgSliderAnimation = this.intervalo.subscribe(() => this.nextImg());
  }

  ngOnDestroy(): void {
    this.imgSliderAnimation.unsubscribe();
  }

  ngAfterViewInit(): void {
    const imageSliderHTML = this.imageSliderRef()?.nativeElement;
    this.renderer2.setStyle(imageSliderHTML, "left", "0%");
  }

  private nextImg(): void {
    const imageSliderHTML = this.imageSliderRef()?.nativeElement;
    const imagesHTML = this.imagesRef().map((image) => image.nativeElement);
    const firtImage = imagesHTML[this.imageSliderIndex];
    
    this.renderer2.setStyle(imageSliderHTML, "left", "-100%");
    this.renderer2.setStyle(imageSliderHTML, "transition", "left 0.5s");

    this.imageSliderIndex = this.imageSliderIndex >= imagesHTML.length - 1 ? 0 : this.imageSliderIndex + 1;

    setTimeout(() => {
      this.renderer2.setStyle(imageSliderHTML, "transition", "none");
      this.renderer2.appendChild(imageSliderHTML, firtImage);
      this.renderer2.setStyle(imageSliderHTML, "left", "0%");
    }, 500);
    
  }
}
