/// <reference types="@sveltejs/kit" />

declare interface Window {
  QRCode: any;
}

declare type DndEvent = import('svelte-dnd-action').DndEvent;
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
    onfinalize?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
    onclick_outside?: (event: CustomEvent<any>) => void;
  }
}
