'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBudget } from '@/context/budget-context';
import { useToast } from '@/hooks/use-toast';
import { MOCK_CATEGORIES } from '@/lib/data';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
  category: z.string().optional(),
});

type AddBudgetFormValues = z.infer<typeof formSchema>;

interface AddBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'monthly' | 'category';
}

export default function AddBudgetDialog({
  isOpen,
  onOpenChange,
  type,
}: AddBudgetDialogProps) {
  const { setMonthlyBudget, addCategoryBudget } = useBudget();
  const { toast } = useToast();

  const form = useForm<AddBudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: '',
    },
  });

  function onSubmit(values: AddBudgetFormValues) {
    if (type === 'monthly') {
      setMonthlyBudget(values.amount);
      toast({
        title: 'Monthly Budget Set',
        description: `Successfully set monthly budget to ₹${values.amount}.`,
      });
    } else {
      if (values.category) {
        addCategoryBudget({
          category: values.category,
          amount: values.amount,
        });
        toast({
          title: 'Category Budget Set',
          description: `Successfully set budget for ${values.category} to ₹${values.amount}.`,
        });
      }
    }

    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'monthly' ? 'Set Monthly Budget' : 'Set Category Budget'}
          </DialogTitle>
          <DialogDescription>
            {type === 'monthly'
              ? 'Set your overall budget for the month.'
              : 'Set a budget for a specific spending category.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === 'category' && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MOCK_CATEGORIES.filter(c => c.name !== 'Salary').map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Set Budget</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
