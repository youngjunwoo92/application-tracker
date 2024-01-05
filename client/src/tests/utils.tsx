import { MemoryRouter, Routes } from 'react-router-dom';
import { ReactNode } from 'react';

export function withRouter(routes: ReactNode, initialEntry: string = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}
