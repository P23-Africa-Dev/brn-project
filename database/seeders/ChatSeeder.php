<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Conversation;

class ChatSeeder extends Seeder
{
    public function run()
    {
        $u1 = User::factory()->create(['email' => 'alice@example.com', 'name' => 'Alice']);
        $u2 = User::factory()->create(['email' => 'bob@example.com', 'name' => 'Bob']);

        $conv = Conversation::create(['title' => 'Alice & Bob']);
        $conv->participants()->attach([$u1->id, $u2->id]);

        $conv->messages()->create(['user_id' => $u1->id, 'body' => 'Hello Bob!']);
        $conv->messages()->create(['user_id' => $u2->id, 'body' => 'Hi Alice!']);
        $conv->update(['last_message_at' => now()]);
    }
}
