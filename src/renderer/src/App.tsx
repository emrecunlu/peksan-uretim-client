import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SelectMachineAndEmployeePage from '@/pages/auth/SelectMachineAndEmployeePage'
import MainPage from '@/pages/main/MainPage'
import PageLoader from '@/components/common/PageLoader'
import { useLoader } from '@/store/features/loader'
import QuestionsPage from '@/pages/questions/QuestionsPage'
import MainLayout from '@/pages/main/layout/MainLayout'
import PrintPage from './pages/print/PrintPage'

const App: React.FC = () => {
  const { isLoading } = useLoader()

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="/questions" element={<QuestionsPage />}></Route>
        <Route path="/auth">
          <Route path="login" element={<SelectMachineAndEmployeePage />} />
        </Route>
        <Route path="/print">
          <Route index element={<PrintPage />} />
        </Route>
      </Routes>
      <PageLoader isLoading={isLoading} />
    </>
  )
}

export default App
