'use client';
import React from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const NewIssuePage = () => {
  return (
    <div className="max-w-xl  space-y-3">
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon
            height="16"
            width="16"
          />
        </TextField.Slot>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
