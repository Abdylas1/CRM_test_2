import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/ui/HomePage/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';
import { AuthorizationPage } from '../../pages/AuthorizationPage';
import AppLayout from '../provider/Layout/AppLayout';
import { ProfilePage } from '../../pages/ProfilePage';
import { NotesPage } from '../../pages/NotesPage';
import { IntervalTask } from '../../widgets/IntervalTask';
import { DetailsPage } from '../../pages/DetailsPage';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details-notes/:id" element={<IntervalTask />} />
        <Route path="/details-notes/:id/details" element={<DetailsPage />} />
        <Route path="/details-notes/:id/notes" element={<NotesPage />} />
      </Route>
      <Route path="/auth/authorization" element={<AuthorizationPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
