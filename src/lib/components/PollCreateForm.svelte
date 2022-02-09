<script lang="ts">
  import type { Option as OptionType } from '$lib/types/poll';
  import Plus from './Icons/plus.svelte';
  import Check from './Icons/check.svelte';
  import { flip } from 'svelte/animate';
  import { createPoll } from '$lib/utils/poll';
  import { nanoid } from 'nanoid';
  import { dndzone } from 'svelte-dnd-action';
  import { goto } from '$app/navigation';
  import Refresh from './Icons/refresh.svelte';
  import { copyToClipboard } from '$lib/utils/clipboard';
  import TextField from './TextField/TextField.svelte';
  import Choice from './Choice/Choice.svelte';
  import Button from './Button/Button.svelte';

  let title: string = '';
  let description: string = '';
  let options: OptionType[] = [
    { id: nanoid(), text: '' },
    { id: nanoid(), text: '' }
  ];
  let multipleChoice: boolean;
  let maxChoices: number = 1;
  let allowMultipleAnswers: boolean = false;

  // loading indicator for submit button
  let loading: boolean = false;

  const handleNewOption = () => {
    options = [...options, { id: nanoid(), text: '' }];
  };

  const handleDeleteOption = (id: string) => {
    if (options.length <= 2) return;
    options = options.filter((o) => o.id !== id);
  };

  const handleConsider = (e: CustomEvent<DndEvent>) => {
    options = e.detail.items as OptionType[];
  };

  const handleFinalize = (e: CustomEvent<DndEvent>) => {
    options = e.detail.items as OptionType[];
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // make sure title and options have content in them
    const hasEmptyOptions = options.some((opt) => opt.text.trim() === '');
    if (hasEmptyOptions || title.trim() === '') return;

    loading = true;
    // send request to create poll
    const response = await createPoll({
      title,
      description,
      options,
      allowMultipleAnswers,
      // use max choices when in multiple choice mode, otherwise use 1
      maxChoices: multipleChoice ? maxChoices : 1
    });
    loading = false;

    if (response?.id) {
      // go to poll page
      await goto(`/${response.id}`);

      // copy link to clipboard automatically
      await copyToClipboard(`https://poll.matsku.dev/${response.id}`).catch(() =>
        console.warn('could not copy to clipboard')
      );
      return;
    }

    alert('Hmmm, could not create poll 🤔');
  };
</script>

<form>
  <!-- svelte-ignore a11y-autofocus -->
  <TextField
    size="large"
    required
    bind:value={title}
    placeholder="Poll title here"
    invalid={title.trim() === ''}
  />

  <h2>Description (optional)</h2>

  <textarea class="textarea" bind:value={description} />

  <h2>Choices</h2>
  <ul
    use:dndzone={{ items: options, flipDurationMs: 200 }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each options as { id, text }, index (id)}
      <li animate:flip={{ duration: 200 }}>
        <Choice
          invalid={text.trim() === ''}
          required
          bind:value={text}
          placeholder={`Choice ${index + 1}`}
          on:delete={() => handleDeleteOption(id)}
          canDelete={options.length > 2}
        />
      </li>
    {/each}
  </ul>

  <Button priority="secondary" on:click={handleNewOption}>
    Add choice <Plus />
  </Button>

  <h2>Options</h2>
  <div class="options">
    <div class="maxChoices">
      <label>
        <input type="checkbox" bind:checked={multipleChoice} />
        Multiple choice
      </label>

      {#if multipleChoice}
        <label>
          <input type="number" min={1} max={100} bind:value={maxChoices} />
          Max number of choices
        </label>
      {/if}
    </div>
    <div class="multipleSubmissions">
      <label>
        <input type="checkbox" bind:checked={allowMultipleAnswers} />
        Allow multiple submissions
      </label>
    </div>
  </div>

  <div class="submit">
    <Button on:click={handleSubmit} priority="main" {loading}>
      Create poll <Check />
    </Button>
  </div>
</form>

<style>
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin-top: 4rem;
    font-weight: 800;
  }

  ul {
    outline: none !important;
    margin: 0;
  }

  .textarea {
    padding: 1rem;
    font-family: 'Open Sans';
    font-size: 1rem;
    background: rgba(128, 128, 128, 0.1);
    color: var(--text);
    outline: none;
    border: 2px solid transparent;
    border-radius: 0.25rem;
    max-width: 100%;
    min-width: 100%;
    box-sizing: border-box;
  }

  .textarea:focus {
    outline: none;
    border-color: #888;
    background: rgba(128, 128, 128, 0.2);
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin-bottom: 1rem;
  }

  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .submit {
    margin: 3rem 0;
    display: flex;
  }

  @media screen and (max-width: 800px) {
    .options {
      grid-template-columns: 1fr;
    }
  }

  .maxChoices {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    align-items: center;
    font-size: 1.35rem;
    padding: 0.5rem;
    padding-left: 0;
    width: 100%;
    border-radius: 0.25rem;
  }

  label > input[type='checkbox'] {
    margin-right: 1rem;
    width: 1.5rem;
    min-width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }

  label > input[type='number'] {
    margin-right: 1rem;
    font-size: 1.25rem;
    width: 4ch;
  }
</style>
