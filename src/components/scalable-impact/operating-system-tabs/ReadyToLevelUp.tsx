import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ReadyToLevelUp: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle> \1eady \1o \1evel \1p</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Ready for content...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadyToLevelUp;
