export class PaymentModel {
    chatId!: number
    price!: number
    tariffId?: number | null
    oldExpireDate!: Date
    newExpireDate!: Date
    activatedUserId?: number
    maxFiltersCount!: number
    createdAt!: Date
    tariff: any
}
