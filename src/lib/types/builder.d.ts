import type { Readable, Writable } from 'svelte/store';

export type Builder<In extends Record<string, any>, Out extends Record<string, any>> = In & {
	build: () => Out;
};

export type BuilderOutput<T> = T extends Builder ? ReturnType<T['build']> : never;
export type BuilderInput<T> = T extends Builder<infer I, any> ? Omit<I, 'build'> : never;

type TestType = Builder<{ a: string }, { b: string; c: any[] }>;
type In = BuilderInput<TestType>;
type Out = BuilderOutput<TestType>;

export type BuilderStore<In, Out> = Writable<Omit<In, 'children'>> & {
	build: () => Out;
};
