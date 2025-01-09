import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UtxoService } from './utxo.service';
import { UTXO } from '@common/interfaces/types';

/**
 * Controller responsible for handling Unspent Transaction Outputs (UTXO)-related HTTP requests.
 *
 * This controller provides endpoints to retrieve UTXOs associated with a wallet descriptor.
 * It leverages the `UtxoService` to perform the underlying operations.
 */
@Controller('utxo')
export class UtxoController {
  /**
   * Creates an instance of UtxoController.
   *
   * @param utxoService Service responsible for managing UTXOs.
   */
  constructor(private readonly utxoService: UtxoService) {}

  /**
   * Retrieves the UTXOs for a wallet associated with a descriptor.
   *
   * This endpoint accepts a wallet descriptor as a query parameter and returns
   * a list of UTXOs associated with that descriptor. It leverages the `UtxoService`
   * to fetch and enrich the UTXO data.
   *
   * @param descriptor - The wallet descriptor used to generate or retrieve UTXOs.
   * @returns An object containing an array of UTXOs.
   *
   * @throws {HttpException} Throws an INTERNAL_SERVER_ERROR if there is an issue fetching the UTXOs.
   */
  @Get('utxos')
  async getUtxos(
    @Query('descriptor') descriptor: string,
  ): Promise<{ utxos: UTXO[] }> {
    try {
      return await this.utxoService.getUtxos(descriptor);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve UTXOs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
