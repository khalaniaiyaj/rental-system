export class ItemDto {
  name: string;
  rentPrice: number;
  manufactureDate?: Date;
  user?: string;
  isTaken?: boolean;
  actualCost: number;
}
