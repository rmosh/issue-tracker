'use client';
// Import necessary modules and components
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

// Define the component
const NewIssuePage = () => {
  interface IssueForm {
    title: string;
    description: string;
  }
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  // Render the form with error message
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon
            aria-hidden="true"
            focusable="false"
          />
        </TextField.Slot>
        <TextField.Input
          placeholder="Title"
          {...register('title')}
        />
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            placeholder="Description"
            {...field}
          />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

// Export the component
export default NewIssuePage;
