
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Basket from './Basket';
import useUserStore from '../store/useStore';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { BasketItem } from '../types/types';

jest.mock('../store/useStore');

const mockedUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;

const renderWithProviders = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>{ui}</MemoryRouter>
        </QueryClientProvider>
    );
};
const incrementMock = jest.fn();
const decrementMock = jest.fn();
const resetMock = jest.fn();
const showMock = jest.fn();
const saveOrderMock = jest.fn();


describe('Basket Component', () => {
    const itemsMock = [
        { product: { id: '1', title: 'Product 1', price: 10 }, quantity: 2 },
        { product: { id: '2', title: 'Product 2', price: 5 }, quantity: 1 },
    ];

    beforeEach(() => {
        mockedUseUserStore.mockReturnValue({
            items: itemsMock,
            increment: incrementMock,
            decrement: decrementMock,
            reset: resetMock,
            show: showMock,
            saveOrder: saveOrderMock,
        } as any);
        mockedUseUserStore.mockImplementation((selector) =>
            selector({
                items: [
                    { product: { id: '1', title: 'Product 1', price: 10 }, quantity: 2 },
                    { product: { id: '2', title: 'Product 2', price: 5 }, quantity: 1 },
                ] as BasketItem[],
                increment: jest.fn(),
                decrement: jest.fn(),
                reset: jest.fn(),
                show: jest.fn(),
                saveOrder: jest.fn(),
                addItemToBasket: jest.fn(),
                removeItem: jest.fn()
            })
        );
    });

    it('renders items in the basket', () => {

        renderWithProviders(<Basket />);
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getAllByText(/BYN/)).toHaveLength(3);
    });

    it('calculates total correctly', () => {
        renderWithProviders(<Basket />);
        expect(screen.getByText('25 BYN')).toBeInTheDocument(); // 10*2 + 5*1
    });

    it('calls increment and decrement functions', () => {
        renderWithProviders(<Basket />);
        const incrementButtons = screen.getAllByText('+');
        const decrementButtons = screen.getAllByText('-');

        fireEvent.click(incrementButtons[0]);
        expect(incrementMock).toHaveBeenCalledWith(1);

        fireEvent.click(decrementButtons[1]);
        expect(decrementMock).toHaveBeenCalledWith(2);
    });

    it('calls reset and show functions', () => {
        renderWithProviders(<Basket />);
        fireEvent.click(screen.getByRole('button', { name: /reset/i }));
        expect(resetMock).toHaveBeenCalled();

        fireEvent.click(screen.getByRole('button', { name: /show/i }));
        expect(showMock).toHaveBeenCalled();
    });

    it('shows success alert after order', async () => {
        renderWithProviders(<Basket />);
        const orderButton = screen.getByText('Order');

        jest.spyOn(Math, 'random').mockReturnValue(0.1);

        fireEvent.click(orderButton);

        await waitFor(() => {
            expect(screen.getByText(/Your data were succesfully sent to server./i)).toBeInTheDocument();
        });

        jest.spyOn(Math, 'random').mockRestore();
    });

    it('renders "No items" when basket is empty', () => {
      mockedUseUserStore.mockImplementationOnce((selector) =>
    selector({
      items: [],
      increment: incrementMock,
      decrement: decrementMock,
      reset: resetMock,
      show: showMock,
      saveOrder: saveOrderMock,
      addItemToBasket: jest.fn(),
      removeItem: jest.fn(),
    })
  );
  
      renderWithProviders(<Basket />);
      expect(screen.getByText(/No items in the basket yet/i)).toBeInTheDocument();
    });
});