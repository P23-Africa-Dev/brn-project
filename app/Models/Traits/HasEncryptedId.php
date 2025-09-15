<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Crypt;

trait HasEncryptedId
{
    public function getEncryptedIdAttribute(): string
    {
        return Crypt::encryptString($this->id);
    }

    public static function findByEncryptedId($encryptedId)
    {
        try {
            $id = Crypt::decryptString($encryptedId);
            return static::find($id);
        } catch (\Exception $e) {
            return null;
        }
    }
}