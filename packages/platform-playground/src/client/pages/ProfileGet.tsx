// import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC, RouterOutputs } from "../utils/trpc";
import { useState } from "react";

export function ProfileGetPage() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return (
        <>
            <div className="card">
                <h2>Profile</h2>
            </div>
        </>
    );
}
