'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CategoryBudget {
  category: string;
  amount: number;
}

export interface Budget {
  monthlyBudget: number;
  categoryBudgets: CategoryBudget[];
}

interface BudgetContextType {
  budget: Budget;
  setMonthlyBudget: (amount: number) => void;
  addCategoryBudget: (categoryBudget: CategoryBudget) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = useState<Budget>({
    monthlyBudget: 0,
    categoryBudgets: [],
  });

  const setMonthlyBudget = (amount: number) => {
    setBudget((prev) => ({ ...prev, monthlyBudget: amount }));
  };

  const addCategoryBudget = (categoryBudget: CategoryBudget) => {
    setBudget((prev) => {
      const existingIndex = prev.categoryBudgets.findIndex(
        (b) => b.category === categoryBudget.category
      );
      const newCategoryBudgets = [...prev.categoryBudgets];
      if (existingIndex > -1) {
        newCategoryBudgets[existingIndex] = categoryBudget;
      } else {
        newCategoryBudgets.push(categoryBudget);
      }
      return { ...prev, categoryBudgets: newCategoryBudgets };
    });
  };

  return (
    <BudgetContext.Provider
      value={{ budget, setMonthlyBudget, addCategoryBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
