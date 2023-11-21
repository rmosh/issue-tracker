'use client';
// Import necessary modules and components
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
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
  const [error, setError] = useState('');

  // Render the form with error message
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=""
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('Something went wrong. Please try again ');
          }
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
    </div>
  );
};

// Export the component
export default NewIssuePage;
